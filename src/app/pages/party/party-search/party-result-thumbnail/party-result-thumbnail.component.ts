import { Component, Input } from '@angular/core';
import { Party } from '../../../../models/party';
import { politicSideMapperEnumToUser } from '../../../../mappers/politicside-mapper';
import { RouterModule } from '@angular/router';
import { FollowButtonComponent } from '../../../../utils/follow-button/follow-button.component';

@Component({
  selector: 'app-party-result-thumbnail',
  standalone: true,
  imports: [RouterModule, FollowButtonComponent],
  templateUrl: './party-result-thumbnail.component.html',
  styleUrl: './party-result-thumbnail.component.scss'
})
export class PartyResultThumbnailComponent {

  @Input() party!: Party;

  mapperEnumToString = politicSideMapperEnumToUser;

  onError(event: any) {
    event.target.src = '../assets/default-profil.webp';
  }

  get partyLogo(): string {
    if(this.party.logo !== '') {
      return this.party.logo;
    }
    return '../assets/default-profil.webp'
  }

}
