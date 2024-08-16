import { Component, Input } from '@angular/core';
import { Argument, ArgumentType } from '../../../models/argument';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { VisitorService } from '../../../services/visitor.service';
import { User } from '../../../models/users';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { ReportComponent } from '../../../utils/report/report.component';
import { ReportType } from '../../../models/report';
import { Debate, DebateVoteFromUser } from '../../../models/debate';
import { DebateVote } from '../../../enums/voteDebate';
import { politicSideMapperEnumToUser } from '../../../mappers/politicside-mapper';

@Component({
  selector: 'app-single-argument-presentation',
  standalone: true,
  imports: [CommonModule, RouterModule, ReportComponent],
  templateUrl: './single-argument-presentation.component.html',
  styleUrl: './single-argument-presentation.component.scss'
})
export class SingleArgumentPresentationComponent {

  @Input() argument!: Argument;
  @Input() $voteSubject!: any;

  userVoteForSubDebate: DebateVoteFromUser | null = null;

  reportType = ReportType.ARGUMENT;

  constructor(
    private router: Router,
    private visitorService: VisitorService,
    private apiService: ApiHandlerService
  ) {
  }

  ngOnInit() {
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
    if(this.argument.hasVote){
      this.$voteSubject.next({argumentId: this.argument.id, vote: null});
      return;
    }
    this.$voteSubject.next({argumentId: this.argument.id, vote: true});
  }
  
  onVoteDown(event: any) {
    event.stopPropagation();
    if(this.argument.hasVote === false){
      this.$voteSubject.next({argumentId: this.argument.id, vote: null});
      return;
    }
    this.$voteSubject.next({argumentId: this.argument.id, vote: false});
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
}
