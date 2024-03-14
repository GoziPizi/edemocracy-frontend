import { Component, Input } from '@angular/core';
import { Debate } from '../../../models/debate';

@Component({
  selector: 'app-debate-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './debate-thumbnail.component.html',
  styleUrl: './debate-thumbnail.component.scss'
})
export class DebateThumbnailComponent {

  @Input() debate!: Debate;

  get debateTitle() {
    if(this.debate) {
      return this.debate.title;
    }
    return '';
  }

  get debateDescription() {
    if(this.debate) {
      return this.debate.description;
    }
    return '';
  }
}
