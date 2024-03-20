import { Component, ViewChild } from '@angular/core';
import { Debate } from '../../models/debate';
import { ApiHandlerService } from '../../services/api-handler.service';
import { Argument } from '../../models/argument';
import { ActivatedRoute } from '@angular/router';
import { ArgumentForDebateThumbnailComponent } from '../../thumbnails/arguments/argument-for-debate-thumbnail/argument-for-debate-thumbnail.component';
import { CommonModule } from '@angular/common';
import { ForAgainstDebateComponent } from './for-against-debate/for-against-debate.component';
import { DebateVote } from '../../enums/voteDebate';
import { debateVoteEnumToInt, debateVoteEnumToString, stringToDebateVoteEnum } from '../../mappers/vote-mapper';

@Component({
  selector: 'app-debate',
  standalone: true,
  imports: [ArgumentForDebateThumbnailComponent, ForAgainstDebateComponent, CommonModule],
  templateUrl: './debate.component.html',
  styleUrl: './debate.component.scss'
})
export class DebateComponent {

  @ViewChild(ForAgainstDebateComponent) forAgainstDebate!: ForAgainstDebateComponent;

  debateId: string = '1';
  debate: Debate = new Debate();
  arguments: Argument[] = [];

  voteValues = [
    DebateVote.REALLY_AGAINST,
    DebateVote.AGAINST,
    DebateVote.NEUTRAL,
    DebateVote.FOR,
    DebateVote.REALLY_FOR
  ]

  routeSubscription: any;

  mapperEnumToString = debateVoteEnumToString;

  constructor(
    private apiHandler: ApiHandlerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.debateId = params['id'];
      this.getDebate();
      this.getDebateArguments();
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  getDebate() {
    this.apiHandler.getDebate(this.debateId).subscribe(
      (debate: Debate) => {
        this.debate = debate;
        this.updateForAgainstDebateWidth();
      }
    );
  }

  getDebateArguments() {
    this.apiHandler.getDebateArguments(this.debateId).subscribe(
      (args: Argument[]) => {
        this.arguments = args;
      }
    );
  }

  voteForDebate(vote: DebateVote) {
    this.apiHandler.voteForDebate(this.debateId, vote).subscribe({
      next: () => {
        this.getDebate();
        this.getDebateArguments();
      }
    })
  }

  updateForAgainstDebateWidth() {
    let width = 0.5;
    if(this.debate.nbVotes == 0) {
      width = 0.5;
      return;
    }
    let ratio = this.debate.score / (2*this.debate.nbVotes);
    width = (ratio + 1) / 2;
    this.forAgainstDebate.updateWidth(width);
  }

  isCurrentValue(value: number):boolean {
    let value2 = DebateVote[value] as unknown
    let vote = this.debate.hasVote as unknown

    return value2 === vote;
  }

  get popularArguments(): Argument[] {
    return this.arguments.sort((a, b) => {
      return (b.nbGood + b.nbBad);
    });
  }

  get recentArguments(): Argument[] {
    return this.arguments.sort((a, b) => {
      return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });
  }

}
