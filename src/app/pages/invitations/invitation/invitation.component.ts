import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Party } from '../../../models/party';
import { PartyResultThumbnailComponent } from '../../party/party-search/party-result-thumbnail/party-result-thumbnail.component';
import { CommonModule } from '@angular/common';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [PartyResultThumbnailComponent, CommonModule],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.scss'
})
export class InvitationComponent {

  invitationId: string = '';
  invitation: any;

  partyId: string = '';
  party: Party = new Party();

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToasterService
  ) {
    this.route.params.subscribe(params => {
      this.invitationId = params['id'];
      this.getInvitation();
    });
  }

  getInvitation() {
    if(this.invitationId === '') return;
    this.apiHandler.getInvitation(this.invitationId).subscribe({
      next: (response: any) => {
        this.invitation = response;
        this.partyId = this.invitation.partyId;
        this.getParty();
      },
      error: (error: any) => {
        this.router.navigate(['/invitations']);
      }
    });
  }

  getParty() {
    if(this.partyId === '') return;
    this.apiHandler.getParty(this.partyId).subscribe((response: any) => {
      this.party = response;
    });
  }

  answer(answer: boolean) {
    this.apiHandler.answerInvitation(this.invitationId, answer).subscribe({
      next: (response: any) => {
        this.toasterService.success('Réponse envoyée');
        this.router.navigate(['/partis', this.partyId])
      },
      error: (error: any) => {
        this.toasterService.error('Erreur lors de la réponse à l\'invitation');
      }
    });
  }

}
