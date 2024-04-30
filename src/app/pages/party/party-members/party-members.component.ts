import { Component, Input } from '@angular/core';
import { PublicUser } from '../../../models/users';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Party } from '../../../models/party';
import { LoadingService } from '../../../services/loading.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-party-members',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './party-members.component.html',
  styleUrl: './party-members.component.scss'
})
export class PartyMembersComponent {

  partyId: string = '';
  party: Party = new Party();
  users: PublicUser[] = [];

  isAdmin: boolean = false;

  isAddMenuOpen: boolean = false;

  error = false; 

  pendingInvites: PublicUser[] = [];
  inviteForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(
    private route: ActivatedRoute,
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.partyId = this.route.snapshot.params['id'];
    this.getPartyMembers();
    this.getParty()
    this.checkAdmin();
  }

  getParty() {
    this.apiHandler.getParty(this.partyId).subscribe((party: Party) => {
      this.party = party;
    });
  }

  getPartyMembers() {
    if(this.partyId === '') return;
    this.apiHandler.getPartyMembers(this.partyId).subscribe((users: PublicUser[]) => {
      this.users = users;
    });
  }

  checkAdmin() {
    this.loadingService.increment();
    this.apiHandler.checkAdminPartyRights(this.partyId).subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
      this.loadingService.decrement();
    });
  }

  setAddMenu(value: boolean) {
    this.isAddMenuOpen = value;
  }

  inviteUser() {
    this.loadingService.increment();
    if(this.inviteForm.invalid || this.inviteForm.value.email === null || this.inviteForm.value.email === undefined) {
      this.loadingService.decrement();
      return;
    }
    this.apiHandler.addMemberToParty(this.partyId, this.inviteForm.value.email).subscribe({
      next: () => this.loadingService.decrement(),
      error: () => {
        this.loadingService.decrement()
        this.error = true;
      }
    });
  }

}
