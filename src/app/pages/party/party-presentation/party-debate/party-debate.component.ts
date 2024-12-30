import { Component, Input } from '@angular/core';
import { ApiHandlerService } from '../../../../services/api-handler.service';
import { Debate } from '../../../../models/debate';
import { CommonModule } from '@angular/common';
import { DebateAdvancedThumbnailComponent } from "../../../../thumbnails/debates/debate-advanced-thumbnail/debate-advanced-thumbnail.component";

@Component({
  selector: 'app-party-debate',
  standalone: true,
  imports: [CommonModule, DebateAdvancedThumbnailComponent],
  templateUrl: './party-debate.component.html',
  styleUrl: './party-debate.component.scss'
})
export class PartyDebateComponent {

  @Input() partyId!: string;
  debateThumbnails: Debate[] = [];

  expanded: boolean = false;

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit() {
    this.fetchDebateThumbnails();
  }

  fetchDebateThumbnails() {
    this.apiHandler.getPartyDebates(this.partyId).subscribe((debates: Debate[]) => {
      this.debateThumbnails = debates.slice(0, 5);
    });
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

} 
