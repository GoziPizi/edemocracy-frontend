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
import { PartyCommentsComponent } from './party-comments/party-comments.component';
import { ToasterService } from '../../../services/toaster.service';
import { VisitorService } from '../../../services/visitor.service';

@Component({
  selector: 'app-party-presentation',
  standalone: true,
  imports: [RouterModule, CommonModule, SmallTopicThumbnailComponent, PartyHistoricComponent, PartyOpinionsComponent, PartyCommentsComponent],
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
    private loadingService: LoadingService,
    private toasterService: ToasterService,
    private visitorService: VisitorService
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
    if (this.visitorService.isVisitor) return;
    this.loadingService.increment();
    this.apiHandler.checkAdminPartyRights(this.partyId).subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
      this.loadingService.decrement();
    });
  }

  get partyLogo() {
    return (this.party.logo && this.party.logo != '') ? this.party.logo : '../../../../assets/default-profil.webp';
  }

}
