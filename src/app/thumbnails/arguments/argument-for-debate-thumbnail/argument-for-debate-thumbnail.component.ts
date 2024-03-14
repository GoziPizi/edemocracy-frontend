import { Component, Input } from '@angular/core';
import { Argument } from '../../../models/argument';

@Component({
  selector: 'app-argument-for-debate-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './argument-for-debate-thumbnail.component.html',
  styleUrl: './argument-for-debate-thumbnail.component.scss'
})
export class ArgumentForDebateThumbnailComponent {

  @Input() argument!: Argument;

  get hasVotes() {
    if(this.argument.hasVote === null) {
      return false;
    }
    return true;
  }

}
