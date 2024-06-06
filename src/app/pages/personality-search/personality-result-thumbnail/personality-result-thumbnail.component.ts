import { Component, Input } from '@angular/core';
import { PersonalityWithUser } from '../../../models/personality';
import { RouterModule } from '@angular/router';
import { politicSideMapperEnumToUser } from '../../../mappers/politicside-mapper';
import { FollowButtonComponent } from '../../../utils/follow-button/follow-button.component';

@Component({
  selector: 'app-personality-result-thumbnail',
  standalone: true,
  imports: [RouterModule, FollowButtonComponent],
  templateUrl: './personality-result-thumbnail.component.html',
  styleUrl: './personality-result-thumbnail.component.scss'
})
export class PersonalityResultThumbnailComponent {

  @Input() personality!: PersonalityWithUser;

  get politicSide(): string {
    return politicSideMapperEnumToUser(this.personality.user.politicSide);
  }

}
