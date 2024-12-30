import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DebateAdvancedThumbnailComponent } from "../../../../thumbnails/debates/debate-advanced-thumbnail/debate-advanced-thumbnail.component";
import { Debate } from '../../../../models/debate';
import { ApiHandlerService } from '../../../../services/api-handler.service';

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
  
  expanded: boolean = false;

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit() {
    this.apiHandler.getPersonalDebateOfParty(this.partyId).subscribe((debates: Debate[]) => {
      this.debateThumbnails = debates;
    });
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

}
