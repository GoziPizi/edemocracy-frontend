import { Component, Input } from '@angular/core';
import { following } from '../../../../models/following';
import { ApiHandlerService } from '../../../../services/api-handler.service';
import { PartyResultThumbnailComponent } from '../../../party/party-search/party-result-thumbnail/party-result-thumbnail.component';
import { PersonalityResultThumbnailComponent } from '../../../personality-search/personality-result-thumbnail/personality-result-thumbnail.component';
import { DebateThumbnailComponent } from '../../../../thumbnails/debates/debate-thumbnail/debate-thumbnail.component';
import { CommonModule } from '@angular/common';
import { TopicThumbnailComponent } from '../../../../thumbnails/topic-thumbnail/topic-thumbnail.component';

@Component({
  selector: 'app-single-follow-display',
  standalone: true,
  imports: [PartyResultThumbnailComponent, PersonalityResultThumbnailComponent, DebateThumbnailComponent, CommonModule, TopicThumbnailComponent],
  templateUrl: './single-follow-display.component.html',
  styleUrl: './single-follow-display.component.scss'
})
export class SingleFollowDisplayComponent {

  @Input() follow!: following;
  followEntity?: any;

  constructor(
    private apiHandler: ApiHandlerService
  ) {
  }

  ngOnInit(){
    this.fetchFollowEntity();
  }

  fetchFollowEntity() {
    switch(this.follow.entityType) {
      case 'party':
        this.apiHandler.getParty(this.follow.entityId).subscribe({
          next: (data: any) => {
            this.followEntity = data;
          },
          error: (error: any) => {
            console.error(error);
          }
        });
        break;
      case 'personality':
        this.apiHandler.getPersonality(this.follow.entityId).subscribe({
          next: (data: any) => {
            this.followEntity = data;
          },
          error: (error: any) => {
            console.error(error);
          }
        });
        break;
      case 'debate':
        this.apiHandler.getDebate(this.follow.entityId).subscribe({
          next: (data: any) => {
            this.followEntity = data;
          },
          error: (error: any) => {
            console.error(error);
          }
        });
        break;
      case 'topic':
        this.apiHandler.getTopicById(this.follow.entityId).subscribe({
          next: (data: any) => {
            this.followEntity = data;
          },
          error: (error: any) => {
            console.error(error);
          }
        });
        break;
      default:
        console.error('Type d\'entité inconnu');
    }
  }
}
