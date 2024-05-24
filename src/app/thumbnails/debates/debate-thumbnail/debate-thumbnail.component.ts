import { Component, Input } from '@angular/core';
import { Debate } from '../../../models/debate';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-debate-thumbnail',
  standalone: true,
  imports: [RouterModule],
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
