import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Party } from '../../../models/party';
import { PartyResultThumbnailComponent } from '../../party/party-search/party-result-thumbnail/party-result-thumbnail.component';
import { CommonModule } from '@angular/common';

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
    private route: ActivatedRoute
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
    this.apiHandler.answerInvitation(this.invitationId, answer).subscribe((response: any) => {
      this.router.navigate(['/partis', this.partyId])
    });
  }

}
