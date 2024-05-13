import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Debate } from '../../models/debate';
import { ApiHandlerService } from '../../services/api-handler.service';
import { Argument, ArgumentType } from '../../models/argument';
import { ActivatedRoute } from '@angular/router';
import { ArgumentForDebateThumbnailComponent } from '../../thumbnails/arguments/argument-for-debate-thumbnail/argument-for-debate-thumbnail.component';
import { CommonModule } from '@angular/common';
import { ForAgainstDebateComponent } from './for-against-debate/for-against-debate.component';
import { DebateVote } from '../../enums/voteDebate';
import { debateVoteEnumToString } from '../../mappers/vote-mapper';
import { TopicThumbnailComponent } from '../../thumbnails/topic-thumbnail/topic-thumbnail.component';
import { Topic } from '../../models/topics';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { SingleArgumentPresentationComponent } from './single-argument-presentation/single-argument-presentation.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-debate',
  standalone: true,
  imports: [ArgumentForDebateThumbnailComponent, ForAgainstDebateComponent, CommonModule, TopicThumbnailComponent, FormsModule, SingleArgumentPresentationComponent],
  templateUrl: './debate.component.html',
  styleUrl: './debate.component.scss',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebateComponent {

  @ViewChild(ForAgainstDebateComponent) forAgainstDebate!: ForAgainstDebateComponent;
  @ViewChild('swiperContainer', { static: false }) swiper!: ElementRef;

  voteSubject$ = new Subject<{argumentId: string, vote: boolean}>
  voteSubjectSubscription: any;

  debateId: string = '1';
  debate: Debate = new Debate();
  arguments: Argument[] = [];

  agumentsFor: Argument[] = [];
  agumentsAgainst: Argument[] = [];
  argumentsSolution: Argument[] = [];

  debateTopic: Topic = new Topic();

  voteValues = [
    DebateVote.REALLY_FOR,
    DebateVote.FOR,
    DebateVote.NEUTRAL,
    DebateVote.AGAINST,
    DebateVote.REALLY_AGAINST
  ]

  routeSubscription: any;

  mapperEnumToString = debateVoteEnumToString;

  isPopUpOpen: boolean = false;
  argumentTitle: string = '';
  argumentType: ArgumentType = ArgumentType.FOR;

  constructor(
    private apiHandler: ApiHandlerService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
  ) {
    this.voteSubjectSubscription = this.voteSubject$.subscribe({
      next: (data) => {
        this.voteForArgument(data.argumentId, data.vote);
      }
    });
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.debateId = params['id'];
      this.getDebate();
      this.getDebateArguments();
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.voteSubjectSubscription.unsubscribe();
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
        this.arguments = [...args]
      }
    );
  }

  getTopic() {
    this.apiHandler.getTopicById(this.debate.topicId).subscribe(
      (topic: any) => {
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

  voteForArgument(argumentId: string, vote: boolean | null) {
    if(vote === null) {
      this.loadingService.increment();
      this.apiHandler.deleteVote(argumentId).subscribe(() => {
        this.loadingService.decrement();
        this.refreshPage();
      });
      return;
    }
    if(vote) {
      this.loadingService.increment();
      this.apiHandler.voteUp(argumentId).subscribe(() => {
        this.loadingService.decrement();
        this.refreshPage();
      });
      return;
    }
    else {
      this.loadingService.increment();
      this.apiHandler.voteDown(argumentId).subscribe(() => {
        this.loadingService.decrement();
        this.refreshPage();
      });
    }
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
    this.apiHandler.postArgument(this.argumentTitle, this.argumentType,this.debateId).subscribe({
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

  refreshPage() {
    window.location.reload();
  }

  isNegative(value: number): boolean {
    const result = value === DebateVote.REALLY_AGAINST || value === DebateVote.AGAINST;
    return result
  }

  get popularArguments(): Argument[] {
    let tab = [...this.arguments].sort((a, b) => {
      return (b.nbGood + b.nbBad) - (a.nbGood + a.nbBad);
    });
    return tab;
  }

  get recentArguments(): Argument[] {
    let tab = [...this.arguments].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return tab;
  }  

}
