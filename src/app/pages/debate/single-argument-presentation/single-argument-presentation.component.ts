import { Component, Input } from '@angular/core';
import { Argument } from '../../../models/argument';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-argument-presentation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-argument-presentation.component.html',
  styleUrl: './single-argument-presentation.component.scss'
})
export class SingleArgumentPresentationComponent {

  @Input() argument!: Argument;
  @Input() $voteSubject!: any;

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

}
