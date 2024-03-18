import { Component } from '@angular/core';
import { Party } from '../../../models/party';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { politicSideMapperEnumToUser } from '../../../mappers/politicside-mapper';
import { CommonModule } from '@angular/common';
import { SmallTopicThumbnailComponent } from '../../../thumbnails/topic-thumbnail/small-topic-thumbnail/small-topic-thumbnail.component';
import { PartyHistoricComponent } from './party-historic/party-historic.component';
import { PartyOpinionsComponent } from './party-opinions/party-opinions.component';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-party-presentation',
  standalone: true,
  imports: [RouterModule, CommonModule, SmallTopicThumbnailComponent, PartyHistoricComponent, PartyOpinionsComponent],
  templateUrl: './party-presentation.component.html',
  styleUrl: './party-presentation.component.scss'
})
export class PartyPresentationComponent {

  partyId: string = '';
  party: Party = new Party();

  isAdmin: boolean = false;

  mapperEnumToString = politicSideMapperEnumToUser;

  constructor(
    private route: ActivatedRoute,
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService
  ) {
    this.partyId = this.route.snapshot.params['id'];
    this.getParty();
    this.checkAdmin();
  }

  getParty() {
    this.loadingService.increment();
    this.apiHandler.getParty(this.partyId).subscribe((party: Party) => {
      this.party = party;
      this.loadingService.decrement();
    });
  }

  checkAdmin() {
    this.loadingService.increment();
    this.apiHandler.checkAdminPartyRights(this.partyId).subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
      this.loadingService.decrement();
    });
  }

}
