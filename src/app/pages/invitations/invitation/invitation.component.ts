import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHandlerService } from '../../../services/api-handler.service';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.scss'
})
export class InvitationComponent {

  invitationId: string = '';
  invitation: any;

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
    this.apiHandler.getInvitation(this.invitationId).subscribe((response: any) => {
      this.invitation = response;
    });
  }

}
