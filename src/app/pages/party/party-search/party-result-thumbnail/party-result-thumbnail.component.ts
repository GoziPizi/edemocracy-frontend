import { Component, Input } from '@angular/core';
import { Party } from '../../../../models/party';
import { politicSideMapperEnumToUser } from '../../../../mappers/politicside-mapper';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-party-result-thumbnail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './party-result-thumbnail.component.html',
  styleUrl: './party-result-thumbnail.component.scss'
})
export class PartyResultThumbnailComponent {

  @Input() party!: Party;

  mapperEnumToString = politicSideMapperEnumToUser;

}
