import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DebateAdvancedThumbnailComponent } from '../../../thumbnails/debates/debate-advanced-thumbnail/debate-advanced-thumbnail.component';
import { Debate } from '../../../models/debate';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personality-debate',
  standalone: true,
  imports: [CommonModule, DebateAdvancedThumbnailComponent],
  templateUrl: './personality-debate.component.html',
  styleUrl: './personality-debate.component.scss'
})
export class PersonalityDebateComponent {

  @Input() personalityId!: string;
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
      this.apiHandler.getPersonalityDebates(this.personalityId).subscribe((debates: Debate[]) => {
        this.fetchedDebates = debates;
        this.debateThumbnails = debates.slice(0, 5);
      });
    }
  
    toggleExpanded() {
      this.expanded = !this.expanded;
    }
  
    createDebate() {
      this.router.navigate(['/debate/create'], {
        queryParams: { personalityId: this.personalityId },
        queryParamsHandling: 'merge'
      });
    }
  
    toggleFullView() {
      this.fullList = !this.fullList;
      this.debateThumbnails = this.fetchedDebates;
    }

}
