import { Component, Input } from '@angular/core';
import { PersonalityWithUser } from '../../../models/personality';

@Component({
  selector: 'app-personality-result-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './personality-result-thumbnail.component.html',
  styleUrl: './personality-result-thumbnail.component.scss'
})
export class PersonalityResultThumbnailComponent {

  @Input() personality!: PersonalityWithUser;

  get politicSide(): string {
    switch (this.personality.user.politicSide) {
      case 'left':
        return 'Gauche';
      case 'CENTER':
        return 'Centre';
      case 'right':
        return 'Droite';
      default:
        return '';
    }
  }

}
