import { Component, Input } from '@angular/core';
import { Argument, ArgumentType } from '../../../models/argument';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { VisitorService } from '../../../services/visitor.service';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { ReportComponent } from '../../../utils/report/report.component';
import { ReportType } from '../../../models/report';
import { DebateVoteFromUser } from '../../../models/debate';
import { DebateVote } from '../../../enums/voteDebate';
import { politicSideMapperEnumToUser } from '../../../mappers/politicside-mapper';
import { ToasterService } from '../../../services/toaster.service';
import { ModerationService } from '../../../services/moderation.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-single-argument-presentation',
  standalone: true,
  imports: [CommonModule, RouterModule, ReportComponent],
  templateUrl: './single-argument-presentation.component.html',
  styleUrl: './single-argument-presentation.component.scss'
})
export class SingleArgumentPresentationComponent {

  @Input() argument!: any;
  @Input() $voteSubject!: any;
  @Input() minimal: boolean = false;

  isForcedShown = false;

  userVoteForSubDebate: DebateVoteFromUser | null = null;

  reportType = ReportType.ARGUMENT;

  constructor(
    private router: Router,
    private visitorService: VisitorService,
    private apiService: ApiHandlerService,
    private toaster: ToasterService,
    public moderationService: ModerationService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit() {
    console.log('📦 argument reçu dans le composant :', this.argument);
    this.fetchActualVoteForSubDebate();
  }

  fetchActualVoteForSubDebate() {
    if(this.visitorService.isVisitor) return;
    if(!this.argument.childDebateId) return;
    this.apiService.getDebateVote(this.argument.childDebateId).subscribe({
      next: (vote: any) => {
        this.userVoteForSubDebate = vote;
      }
    })
  }

  onVoteUp(event: any) {
    event.stopPropagation();
    event.preventDefault();
    if(this.visitorService.isVisitor) {
      this.toaster.success('Vous devez être connecté pour voter');
      return;
    }
    if(this.argument.hasVote){
      this.$voteSubject.next({argumentId: this.argument.id, vote: null});
      return;
    }
    this.$voteSubject.next({argumentId: this.argument.id, vote: true});
  }
  
  onVoteDown(event: any) {
    event.stopPropagation();
    event.preventDefault();
    if(this.visitorService.isVisitor) {
      this.toaster.success('Vous devez être connecté pour voter');
      return;
    }
    if(this.argument.hasVote === false){
      this.$voteSubject.next({argumentId: this.argument.id, vote: null});
      return;
    }
    this.$voteSubject.next({argumentId: this.argument.id, vote: false});
  }

  copy(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.moderationService.setCopyContent(this.argument.id);
  }

  fusion(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.loadingService.increment();
    if(!this.moderationService.copyContent) {
      this.toaster.error('Aucun contenu à fusionner');
      return;
    }
    this.apiService.mergeArgumentsFromSameDebate(this.moderationService.copyContent, this.argument.id).subscribe({
      next: () => {
        this.loadingService.decrement();
        this.toaster.success('Fusion effectuée');
        this.refreshPage();
      },
      error: () => {
        this.loadingService.decrement();
        this.toaster.error('Erreur lors de la fusion');
      }
    })
  }

  navigateToDebate() {
    this.router.navigate(['/debate', this.argument.childDebateId], {
      queryParamsHandling: 'merge'
    })
  }

  getColorByValue(): string {
    switch(this.argument.type) {
      case ArgumentType.FOR:
        return '#8ec9ff'; // Choisissez la couleur que vous souhaitez pour 'FOR'
      case ArgumentType.AGAINST:
        return '#ffd1d1'; // Choisissez la couleur que vous souhaitez pour 'AGAINST'
      case ArgumentType.SOLUTION:
        return '#ffe599'; // Choisissez la couleur que vous souhaitez pour 'SOLUTION'
      default:
        return 'transparent'; // Couleur par défaut ou aucune couleur
    }
  }

  getBorderColor() {
    if(this.userVoteForSubDebate === null) {
      return 'transparent';
    }
    let vote = this.userVoteForSubDebate.value;
    if(vote as any == DebateVote[2] || vote as any === DebateVote[1]) {
      return this.greenColor;
    } 
    if(vote as any == DebateVote[-2] || vote as any === DebateVote[-1]) {
      return this.redColor;
    }
    return 'transparent';
  }

  onViewDebate() {
    this.router.navigate(['/debate', this.argument.childDebateId], {
      queryParamsHandling: 'merge'
    })
  }

  onCreateDebate() {
    this.router.navigate(['/debate/create'], {
      queryParams: {argumentId: this.argument.id},
      queryParamsHandling: 'merge'
    })
  }

  forceSee(event: any) {
    event.stopPropagation();
    event.preventDefault();
    this.isForcedShown = true;
  }

  refreshPage() {
    window.location.reload();
  }

  get redColor() {
    return '#D72631';
  }

  get greenColor() {
    return '#2E8B57';
  }

  get stringWidth() {
    if(this.argument.nbGood + this.argument.nbBad === 0) {
      return '50%';
    }
    return `${this.argument.nbGood / (this.argument.nbGood + this.argument.nbBad) * 100}%`;
  }

  get oppositeStringWidth() {
    if(this.argument.nbGood + this.argument.nbBad === 0) {
      return '50%';
    }
    return `${this.argument.nbBad / (this.argument.nbGood + this.argument.nbBad) * 100}%`;
  }

  get isVisitor() {
    return this.visitorService.isVisitor;
  }

  get name() {
    if(this.argument?.userName) {
      return this.argument.userName;
    }
    return 'Anonyme';
  }

  get work () {
    if(this.argument?.userWork) {
      return ', ' + this.argument.userWork;
    }
    return '';
  }

  get politicSide() {
    if(this.argument?.userPoliticSide) {
      return ', ' + politicSideMapperEnumToUser(this.argument.userPoliticSide);
    }
    return '';
  }

  get isModerator() {
    return this.apiService.user?.role === 'MODERATOR1'
    || this.apiService.user?.role === 'MODERATOR2'
    || this.apiService.user?.role === 'ADMIN';
  }
}
