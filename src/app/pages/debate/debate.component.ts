import {
  Component,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewEncapsulation,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Debate, DebateDescriptionReformulation } from '../../models/debate';
import { ApiHandlerService } from '../../services/api-handler.service';
import { Argument, ArgumentType } from '../../models/argument';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForAgainstDebateComponent } from './for-against-debate/for-against-debate.component';
import { DebateVote } from '../../enums/voteDebate';
import { debateVoteEnumToString } from '../../mappers/vote-mapper';
import { Topic } from '../../models/topics';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { SingleArgumentPresentationComponent } from './single-argument-presentation/single-argument-presentation.component';
import { Subject } from 'rxjs';
import { ArgumentsDisplayerComponent } from './arguments-displayer/arguments-displayer.component';
import { ArgumentDebatePresentationComponent } from './argument-debate-presentation/argument-debate-presentation.component';
import { SingleReformulationPresentationComponent } from './single-reformulation-presentation/single-reformulation-presentation.component';
import { ToasterService } from '../../services/toaster.service';
import { VisitorService } from '../../services/visitor.service';
import { ReportComponent } from '../../utils/report/report.component';
import { ReportType } from '../../models/report';
import { FollowButtonComponent } from '../../utils/follow-button/follow-button.component';
import { HeaderComponent } from '../../utils/header/header.component';
import { RouterLink } from '@angular/router';
import { ModerationToolbarComponent } from '../../utils/moderation-toolbar/moderation-toolbar.component';
import { SharingService } from '../../services/sharing.service';


@Component({
  selector: 'app-debate',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArgumentDebatePresentationComponent,
    SingleReformulationPresentationComponent,
    SingleArgumentPresentationComponent,
    ReportComponent,
    HeaderComponent,
    RouterLink,
    FollowButtonComponent,
    ModerationToolbarComponent,
    ForAgainstDebateComponent 
  ],
  templateUrl: './debate.component.html',
  styleUrl: './debate.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DebateComponent implements OnInit, OnDestroy {
  @ViewChild('debateResult') forAgainstDebate!: ForAgainstDebateComponent;
  @ViewChild('debateContributorsResult')
  forAgainstContributorsDebate!: ForAgainstDebateComponent;
  @ViewChild('swiperContainer', { static: false }) swiper!: ElementRef;

  @ViewChild('argumentDebatePresentation')
  argumentDebatePresentation!: ArgumentDebatePresentationComponent;

  voteSubject$ = new Subject<{argumentId: string, vote: boolean}>
  voteSubjectSubscription: any;
  slidesPerView = 3; // Par défaut pour PC
  isChildDebate: boolean = true; // ou true selon les cas réels

  debateId: string = '1';
  debate: Debate = new Debate();
  arguments: Argument[] = [];
  reformulations: DebateDescriptionReformulation[] = [];
  mainReformulationIndex: number = 0;
  public argumentsFor: any[] = [];
  public argumentsAgainst: any[] = [];
  public argumentsSolution: any[] = [];


  debateTopic: Topic = new Topic();

  voteValues = [
    DebateVote.REALLY_FOR,
    DebateVote.FOR,
    DebateVote.NEUTRAL,
    DebateVote.AGAINST,
    DebateVote.REALLY_AGAINST,
  ];

  routeSubscription: any;

  mapperEnumToString = debateVoteEnumToString;

  reportType = ReportType;

  reformulationPopUp: boolean = false;
  newReformulationForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    isNameDisplayed: new FormControl(false),
    isWorkDisplayed: new FormControl(false),
    isPoliticSideDisplayed: new FormControl(false)
  });

  argumentTypes = [
    ArgumentType.FOR,
    ArgumentType.AGAINST,
    ArgumentType.SOLUTION
  ]

  argumentPopUp: boolean = false;
  newArgumentForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    type: new FormControl(ArgumentType.FOR, Validators.required),
    isNameDisplayed: new FormControl(false),
    isWorkDisplayed: new FormControl(false),
    isPoliticSideDisplayed: new FormControl(false)
  });

  constructor(
    private apiHandler: ApiHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private toasterService: ToasterService,
    private visitorService: VisitorService,
    private sharingService: SharingService

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
      this.getDebateReformulations();
    });
  
    this.updateSwiperSlidesPerView();
    window.addEventListener('resize', this.updateSwiperSlidesPerView.bind(this));
  }
  
  onFollow(): void {
    console.log('⭐️ Suivre déclenché');
    // Ajoute ici ta logique de suivi
  }
  
  onGoToParentDebate(): void {
    // 👉 Ici tu définis ce que tu veux faire.
    // Par exemple, revenir à un débat parent ou à une liste.
    window.history.back(); // simple retour arrière
  }

  onShare(): void {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Voir ce débat',
        text: 'Viens donner ton avis sur ce débat',
        url,
      });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('📋 Lien copié dans le presse-papiers !');
      });
    }
  }
  
  onReport(): void {
    console.log('🟠 Signalement déclenché');
    // Ajoute ici ta logique de signalement
  }
  

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateSwiperSlidesPerView.bind(this));
  
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.voteSubjectSubscription) {
      this.voteSubjectSubscription.unsubscribe();
    }
  }
  
  

  getDebate() {
    this.loadingService.increment();
    this.apiHandler.getDebate(this.debateId).subscribe({
      next: (debate: Debate) => {
        this.loadingService.decrement();
        this.debate = debate;
        this.forAgainstDebate.setDebateResult(this.debate.debateResult);
        this.forAgainstContributorsDebate.setDebateResult(this.debate.debateContributorsResult);
        this.getTopic();
        this.argumentDebatePresentation.setArgumentId(this.debate.argumentId);
        this.patchReformulationForm();
      },
      error: (err) => {
        this.loadingService.decrement();
        this.toasterService.error('Erreur lors de la récupération du débat');
      } 
    });
  }

  getDebateArguments() {
    this.loadingService.increment();
    this.apiHandler.getDebateArguments(this.debateId).subscribe(
      {
        next: (args: Argument[]) => {
          this.loadingService.decrement();
          this.arguments = args;
          this.updateArguments();
        },
        error: (err) => {
          this.loadingService.decrement();
          this.toasterService.error('Erreur lors de la récupération des arguments');
        }
      }
    );
  }

   getDebateReformulations() {
    this.loadingService.increment();

    this.apiHandler.getDebateReformulations(this.debateId).subscribe({
      next: (reformulations: DebateDescriptionReformulation[]) => {
        if (!reformulations || reformulations.length === 0) {
          this.reformulations = [];
          this.loadingService.decrement();
          return;
        }

        // 1. Trier par popularité
        const sortedByScore = [...reformulations].sort((a, b) => b.score - a.score);
        const main = sortedByScore[0];

        // 2. Trier par date (du plus ancien au plus récent pour le côté gauche)
        const left = [...reformulations]
          .filter(r => r.id !== main.id)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        // 3. Les plus populaires décroissants vers la droite
        const right = [...sortedByScore].filter(r => r.id !== main.id);

        // 4. Recomposer
        this.reformulations = [...left, main, ...right];
        this.mainReformulationIndex = this.reformulations.findIndex(r => r.id === main.id);

        this.loadingService.decrement();

        setTimeout(() => {
          const swiperEl: any = this.swiper?.nativeElement;
          if (swiperEl && typeof swiperEl.swiper?.slideTo === 'function') {
            swiperEl.swiper.slideTo(this.mainReformulationIndex, 0);
          }
        }, 200);
      },
      error: (err) => {
        this.loadingService.decrement();
        this.toasterService.error(
          'Erreur lors de la récupération des reformulations'
        );
      },
    });
  }


  updateSwiperSlidesPerView() {
    const swiperEl: any = this.swiper?.nativeElement;
    if (!swiperEl || !swiperEl.swiper) return;
  
    if (window.innerWidth <= 768) {
      swiperEl.swiper.params.slidesPerView = 1;
    } else {
      swiperEl.swiper.params.slidesPerView = 3;
    }
  
    swiperEl.swiper.update();
  }


  patchReformulationForm() {
    if(this.reformulations.length === 0) return;
    this.newReformulationForm.patchValue({
      title: this.debate.title,
      content: this.debate.content
    });
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
    this.loadingService.increment();
    this.apiHandler.voteForDebate(this.debateId, vote).subscribe({
      next: () => {
        this.loadingService.decrement();
        this.toasterService.success('Vote enregistré');
        this.getDebate();
      },
      error: (err) => {
        this.loadingService.decrement();
        this.toasterService.error('Erreur lors du vote');
      }
    })
  }

  voteForArgument(argumentId: string, vote: boolean | null) {
    this.loadingService.increment();
    if(vote === null) {
      this.loadingService.increment();
      this.apiHandler.deleteVote(argumentId).subscribe({
        next: () => {
          this.loadingService.decrement();
          this.toasterService.success('Vote supprimé');
          this.refreshPage();
        },
        error: (err) => {
          this.loadingService.decrement();
          this.toasterService.error('Erreur lors de la suppression du vote');
          this.refreshPage();
        }
      });
      return;
    }
    if(vote) {
      this.loadingService.increment();
      this.apiHandler.voteUp(argumentId).subscribe({
        next: () => {
          this.loadingService.decrement();
          this.toasterService.success('Vote enregistré');
          this.refreshPage();
        },
        error: (err) => {
          this.loadingService.decrement();
          this.toasterService.error('Erreur lors du vote');
          this.refreshPage();
        }
      });
      return;
    }
    else {
      this.loadingService.increment();
      this.apiHandler.voteDown(argumentId).subscribe({
        next: () => {
          this.loadingService.decrement();
          this.toasterService.success('Vote enregistré');
          this.refreshPage();
        },error: (err) => {
          this.loadingService.decrement();
          this.toasterService.error('Erreur lors du vote');
          this.refreshPage();
        }
      });
    }
  }

  updateArguments() {
    console.log('🧠 this.arguments =', this.arguments);

    const argumentsFor = this.arguments.filter(arg => arg.type === ArgumentType.FOR);
    const argumentsAgainst = this.arguments.filter(arg => arg.type === ArgumentType.AGAINST);
    const argumentsSolution = this.arguments.filter(arg => arg.type === ArgumentType.SOLUTION);

    console.log('✅ argumentsFor:', argumentsFor);
    console.log('❌ argumentsAgainst:', argumentsAgainst);
    console.log('🛠 argumentsSolution:', argumentsSolution);
  }
  isCurrentValue(value: number): boolean {
    let value2 = DebateVote[value] as unknown;
    let vote = this.debate.hasVote as unknown;

    return value2 === vote;
  }

  onValidate() {
    this.loadingService.increment();
    let data: any = this.newArgumentForm.value;
    data = {
      ...data,
      debateId: this.debateId
    }
    this.apiHandler.postArgument(data).subscribe({
      next: () => {
        this.loadingService.decrement();
        this.toasterService.success('Argument enregistré');
        this.refreshPage();
      }, 
      error: (err) => {
        if(err.error.errorName === 'ContentWithBanWordsException') {
          this.toasterService.error('Le contenu contient des mots bannis');
          this.loadingService.decrement();
          return;
        }
        this.loadingService.decrement();
        this.toasterService.error('Erreur lors de l\'enregistrement de l\'argument');
        this.refreshPage();
      }
    });
  }

  onValidateReformulation() {
    this.loadingService.increment();
    let data: any = this.newReformulationForm.value;
    data = {
      ...data,
      debateId: this.debateId
    }
    this.apiHandler.postReformulation(data).subscribe({
      next: () => {
        this.loadingService.decrement();
        this.toasterService.success('Reformulation enregistrée');
        this.refreshPage();
      },
      error: (err) => {
        if(err.error.errorName === 'ContentWithBanWordsException') {
          this.toasterService.error('Le contenu contient des mots bannis');
          this.loadingService.decrement();
          return;
        }
        this.loadingService.decrement();
        this.toasterService.error('Erreur lors de l\'enregistrement de la reformulation');
        this.refreshPage();
      }
    });
  }

  toggleArgumentPopUp() {
    this.argumentPopUp = !this.argumentPopUp;
  }

  toggleReformulationPopUp() {
    this.reformulationPopUp = !this.reformulationPopUp;
  }

  refreshPage() {
    window.location.reload();
  }

  isNegative(value: number): boolean {
    const result = value === DebateVote.REALLY_AGAINST || value === DebateVote.AGAINST;
    return result
  }

getClass(value: number): string {
  switch (value) {
    case -2: return 'really-against';
    case -1: return 'against';
    case 0: return 'neutral';
    case 1: return 'for';
    case 2: return 'really-for';
    default: return '';
  }
}
share(event: any) {
  event.stopPropagation();
  event.preventDefault();
  this.sharingService.shareDebate(this.debateId);
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

  get popularReformulations(): DebateDescriptionReformulation[] {
    return this.reformulations.sort((a, b) => b.score - a.score).slice(0, 3);
  }
  
  get recentReformulations(): DebateDescriptionReformulation[] {
    return this.reformulations.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);
  }

  get isDebateFromArgument(): boolean {
    if(this.debate.argumentId === null || this.debate.argumentId === undefined || this.debate.argumentId === '') {
      return false;
    }
    return true;
  }

  get isVisitor() {
    return this.visitorService.isVisitor;
  }

  get redColor() {
    return '#D72631';
  }

  get greenColor() {
    return '#2E8B57';
  }

  get lineWidth() {
    const sumFor = this.debate.debateResult.nbReallyFor + this.debate.debateResult.nbFor;
    const sumAgainst = this.debate.debateResult.nbReallyAgainst + this.debate.debateResult.nbAgainst;
    const sum = sumFor + sumAgainst;
    if(sum === 0) {
      return '50%';
    }
    return `${sumFor / sum * 100}%`;
  }

  get oppositelineWidth() {
    const sumFor = this.debate.debateResult.nbReallyFor + this.debate.debateResult.nbFor;
    const sumAgainst = this.debate.debateResult.nbReallyAgainst + this.debate.debateResult.nbAgainst;
    const sum = sumFor + sumAgainst;
    if(sum === 0) {
      return '50%';
    }
    return `${sumAgainst / sum * 100}%`;
  }

  get numberForPourcentage() {
    const sumFor = this.debate.debateResult.nbReallyFor + this.debate.debateResult.nbFor;
    const sum = this.numberOfVotants;
    if(sum === 0) {
      return '0%';
    }
    return `${sumFor / sum * 100}%`;
  }
}
