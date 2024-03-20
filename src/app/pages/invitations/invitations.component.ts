import { Component } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-invitations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './invitations.component.html',
  styleUrl: './invitations.component.scss'
})
export class InvitationsComponent {

  invitations: any[] = [];

  constructor(
    private apiHandler: ApiHandlerService
  ) {

  }

  ngOnInit() {
    this.apiHandler.getInvitations().subscribe((response: any) => {
      this.invitations = response;
    });
  }

}
