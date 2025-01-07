import { Component, Input } from '@angular/core';
import { ApiHandlerService } from '../../../../services/api-handler.service';
import { Debate } from '../../../../models/debate';
import { CommonModule } from '@angular/common';
import { DebateAdvancedThumbnailComponent } from "../../../../thumbnails/debates/debate-advanced-thumbnail/debate-advanced-thumbnail.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-party-debate',
  standalone: true,
  imports: [CommonModule, DebateAdvancedThumbnailComponent],
  templateUrl: './party-debate.component.html',
  styleUrl: './party-debate.component.scss'
})
export class PartyDebateComponent {

  @Input() partyId!: string;
  fetchedDebates: Debate[] = [];
  debateThumbnails: Debate[] = [];

  expanded: boolean = false;
  fullList: boolean = false;

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchDebateThumbnails();
  }

  fetchDebateThumbnails() {
    this.apiHandler.getPartyDebates(this.partyId).subscribe((debates: Debate[]) => {
      this.fetchedDebates = debates;
      this.debateThumbnails = debates.slice(0, 5);
    });
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  createDebate() {
    this.router.navigate(['/debate/create'], {
      queryParams: { partyId: this.partyId },
      queryParamsHandling: 'merge'
    });
  }

  toggleFullView() {
    this.fullList = !this.fullList;
    this.debateThumbnails = this.fetchedDebates;
  }

} 
