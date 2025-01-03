import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DebateAdvancedThumbnailComponent } from "../../../../thumbnails/debates/debate-advanced-thumbnail/debate-advanced-thumbnail.component";
import { Debate } from '../../../../models/debate';
import { ApiHandlerService } from '../../../../services/api-handler.service';
import { Party } from '../../../../models/party';

@Component({
  selector: 'app-party-personal-debates',
  standalone: true,
  imports: [CommonModule, DebateAdvancedThumbnailComponent],
  templateUrl: './party-personal-debates.component.html',
  styleUrl: './party-personal-debates.component.scss'
})
export class PartyPersonalDebatesComponent {

  @Input() partyId!: string;
  debateThumbnails: Debate[] = [];
  party: Party = new Party();

  expanded: boolean = false;

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit() {
    this.fetchPersonalDebates();
    this.fetchParty();
  }

  fetchPersonalDebates() {
    this.apiHandler.getPersonalDebateOfParty(this.partyId).subscribe((debates: Debate[]) => {
      this.debateThumbnails = debates;
      this.updateDebatesOrder();
    });
  }

  fetchParty() {
    this.apiHandler.getParty(this.partyId).subscribe((party: Party) => {
      this.party = party;
      this.updateDebatesOrder();
    });
  }

  updateDebatesOrder() {
    if(this.debateThumbnails.length === 0) return;
    if(!this.party.firstDebateDisplay) return;

    const firstDebateToShow = this.debateThumbnails.find(debate => debate.id === this.party.firstDebateDisplay);
    if(!firstDebateToShow) return;

    this.debateThumbnails = this.debateThumbnails.filter(debate => debate.id !== this.party.firstDebateDisplay);
    this.debateThumbnails.unshift(firstDebateToShow);

  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

}
