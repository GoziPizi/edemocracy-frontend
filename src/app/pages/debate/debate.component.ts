import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation, ElementRef } from '@angular/core';
import { Debate } from '../../models/debate';
import { ApiHandlerService } from '../../services/api-handler.service';
import { Argument, ArgumentType } from '../../models/argument';
import { ActivatedRoute, Router } from '@angular/router';
import { ArgumentForDebateThumbnailComponent } from '../../thumbnails/arguments/argument-for-debate-thumbnail/argument-for-debate-thumbnail.component';
import { CommonModule } from '@angular/common';
import { ForAgainstDebateComponent } from './for-against-debate/for-against-debate.component';
import { DebateVote } from '../../enums/voteDebate';
import { debateVoteEnumToString } from '../../mappers/vote-mapper';
import { Topic } from '../../models/topics';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { SingleArgumentPresentationComponent } from './single-argument-presentation/single-argument-presentation.component';
import { Subject } from 'rxjs';
import { ArgumentsDisplayerComponent } from './arguments-displayer/arguments-displayer.component';
import { ArgumentDebatePresentationComponent } from './argument-debate-presentation/argument-debate-presentation.component';

@Component({
  selector: 'app-debate',
  standalone: true,
  imports: [
    ArgumentForDebateThumbnailComponent, 
    ForAgainstDebateComponent, 
    CommonModule,
    FormsModule, 
    SingleArgumentPresentationComponent, 
    ArgumentsDisplayerComponent,
    ArgumentDebatePresentationComponent
  ],
  templateUrl: './debate.component.html',
  styleUrl: './debate.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebateComponent {

  @ViewChild('debateResult') forAgainstDebate!: ForAgainstDebateComponent;
  @ViewChild('debateContributorsResult') forAgainstContributorsDebate!: ForAgainstDebateComponent;
  @ViewChild('swiperContainer', { static: false }) swiper!: ElementRef;

  @ViewChild('argumentsFor') argumentsForDisplayer!: ArgumentsDisplayerComponent;
  @ViewChild('argumentsAgainst') argumentsAgainstDisplayer!: ArgumentsDisplayerComponent;
  @ViewChild('argumentsSolution') argumentsSolutionDisplayer!: ArgumentsDisplayerComponent;

  @ViewChild('argumentDebatePresentation') argumentDebatePresentation!: ArgumentDebatePresentationComponent;

  voteSubject$ = new Subject<{argumentId: string, vote: boolean}>
  voteSubjectSubscription: any;

  debateId: string = '1';
  debate: Debate = new Debate();
  arguments: Argument[] = [];

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
    private router: Router,
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
        this.forAgainstDebate.setDebateResult(this.debate.debateResult);
        this.forAgainstContributorsDebate.setDebateResult(this.debate.debateContributorsResult);
        this.getTopic();
        this.argumentDebatePresentation.setArgumentId(this.debate.argumentId);

      }
    );
  }

  getDebateArguments() {
    this.apiHandler.getDebateArguments(this.debateId).subscribe(
      (args: Argument[]) => {
        this.arguments = [...args]
        this.updateArguments();
      }
    );
  }

  getTopic() {
    if(!this.debate.topicId) return;
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

  updateArguments() {
    this.argumentsForDisplayer.setArgumentsList(this.arguments.filter((arg) => arg.type === ArgumentType.FOR));
    this.argumentsAgainstDisplayer.setArgumentsList(this.arguments.filter((arg) => arg.type === ArgumentType.AGAINST));
    this.argumentsSolutionDisplayer.setArgumentsList(this.arguments.filter((arg) => arg.type === ArgumentType.SOLUTION));
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
        this.loadingService.decrement();
        this.refreshPage();
      }, 
      error: (err) => {
        this.loadingService.decrement();
        this.refreshPage();
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

  getClass(value: number): string {
    switch(value) {
      case -2:
        return 'red';
      case -1:
        return 'orange';
      case 0:
        return 'grey';
      case 1:
        return 'lightgreen';
      case 2:
        return 'green';
    }
    return 'grey';
  }

  get numberOfVotants(): number {
    const result = 
      this.debate.debateResult.nbReallyFor +
      this.debate.debateResult.nbFor +
      this.debate.debateResult.nbNeutral +
      this.debate.debateResult.nbAgainst +
      this.debate.debateResult.nbReallyAgainst;
    return result;
  }

  get numberOfContributors(): number {
    const result = 
      this.debate.debateContributorsResult.nbReallyFor +
      this.debate.debateContributorsResult.nbFor +
      this.debate.debateContributorsResult.nbNeutral +
      this.debate.debateContributorsResult.nbAgainst +
      this.debate.debateContributorsResult.nbReallyAgainst;
    return result;
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

  get isDebateFromArgument(): boolean {
    if(this.debate.argumentId === null || this.debate.argumentId === undefined || this.debate.argumentId === '') {
      return false;
    }
    return true;
  }

}
