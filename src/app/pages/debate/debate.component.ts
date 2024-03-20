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
import { SmallTopicThumbnailComponent } from '../../thumbnails/topic-thumbnail/small-topic-thumbnail/small-topic-thumbnail.component';
import { TopicThumbnailComponent } from '../../thumbnails/topic-thumbnail/topic-thumbnail.component';
import { Topic } from '../../models/topics';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-debate',
  standalone: true,
  imports: [ArgumentForDebateThumbnailComponent, ForAgainstDebateComponent, CommonModule, TopicThumbnailComponent, FormsModule],
  templateUrl: './debate.component.html',
  styleUrl: './debate.component.scss'
})
export class DebateComponent {

  @ViewChild(ForAgainstDebateComponent) forAgainstDebate!: ForAgainstDebateComponent;

  debateId: string = '1';
  debate: Debate = new Debate();
  arguments: Argument[] = [];

  debateTopic: Topic = new Topic();

  voteValues = [
    DebateVote.REALLY_AGAINST,
    DebateVote.AGAINST,
    DebateVote.NEUTRAL,
    DebateVote.FOR,
    DebateVote.REALLY_FOR
  ]

  routeSubscription: any;

  mapperEnumToString = debateVoteEnumToString;

  isPopUpOpen: boolean = false;
  argumentTitle: string = '';

  constructor(
    private apiHandler: ApiHandlerService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
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
        this.getTopic();
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

  getTopic() {
    this.apiHandler.getTopicById(this.debate.topicId).subscribe(
      (topic: any) => {
        console.log(topic);
        this.debateTopic = topic;
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

  onValidate() {
    this.loadingService.increment();
    this.apiHandler.postArgument(this.argumentTitle, this.debateId).subscribe({
      next: () => {
        this.getDebateArguments();
        this.loadingService.decrement();
        this.isPopUpOpen = false;
        this.argumentTitle = '';
      }
    });
  }

  togglePopUp() {
    this.isPopUpOpen = !this.isPopUpOpen;
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
