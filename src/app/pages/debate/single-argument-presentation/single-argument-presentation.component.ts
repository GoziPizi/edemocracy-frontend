import { Component, Input } from '@angular/core';
import { Argument, ArgumentType } from '../../../models/argument';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-single-argument-presentation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './single-argument-presentation.component.html',
  styleUrl: './single-argument-presentation.component.scss'
})
export class SingleArgumentPresentationComponent {

  @Input() argument!: Argument;
  @Input() $voteSubject!: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onVoteUp() {
    if(this.argument.hasVote){
      this.$voteSubject.next({argumentId: this.argument.id, vote: null});
      return;
    }
    this.$voteSubject.next({argumentId: this.argument.id, vote: true});
  }
  
  onVoteDown() {
    if(this.argument.hasVote === false){
      this.$voteSubject.next({argumentId: this.argument.id, vote: null});
      return;
    }
    this.$voteSubject.next({argumentId: this.argument.id, vote: false});
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

}
