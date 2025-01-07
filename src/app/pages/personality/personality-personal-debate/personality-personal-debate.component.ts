import { Component, Input } from '@angular/core';
import { Debate } from '../../../models/debate';
import { Personality } from '../../../models/personality';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { DebateAdvancedThumbnailComponent } from "../../../thumbnails/debates/debate-advanced-thumbnail/debate-advanced-thumbnail.component";

@Component({
  selector: 'app-personality-personal-debate',
  standalone: true,
  imports: [CommonModule, DebateAdvancedThumbnailComponent],
  templateUrl: './personality-personal-debate.component.html',
  styleUrl: './personality-personal-debate.component.scss'
})
export class PersonalityPersonalDebateComponent {

  @Input() personalityId!: string;
    debateThumbnails: Debate[] = [];
    fetchedDebates: Debate[] = [];
    personality: Personality = new Personality();
  
    expanded: boolean = false;
    fullList: boolean = false;
  
    constructor(
      private apiHandler: ApiHandlerService
    ) { }
  
    ngOnInit() {
      this.fetchPersonalDebates();
      this.fetchPersonality();
    }
  
    fetchPersonalDebates() {
      this.apiHandler.getPersonalityPersonalDebates(this.personalityId).subscribe((debates: Debate[]) => {
        this.fetchedDebates = debates;
        this.debateThumbnails = debates.slice(0, 5);
        this.updateDebatesOrder();
      });
    }
  
    fetchPersonality() {
      this.apiHandler.getPersonality(this.personalityId).subscribe((personality: Personality) => {
        this.personality = personality;
        this.updateDebatesOrder();
      });
    }
  
    updateDebatesOrder() {
      if(this.debateThumbnails.length === 0) return;
      if(!this.personality.firstDebateDisplay) return;
  
      const firstDebateToShow = this.debateThumbnails.find(debate => debate.id === this.personality.firstDebateDisplay);
      if(!firstDebateToShow) return;
  
      this.debateThumbnails = this.debateThumbnails.filter(debate => debate.id !== this.personality.firstDebateDisplay);
      this.debateThumbnails.unshift(firstDebateToShow);
  
    }
  
    toggleExpanded() {
      this.expanded = !this.expanded;
    }
  
    toggleFullView() {
      this.fullList = !this.fullList;
      this.debateThumbnails = this.fetchedDebates;
    }
  

}
