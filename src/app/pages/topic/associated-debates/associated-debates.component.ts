import { Component, Input } from '@angular/core';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Debate } from '../../../models/debate';
import { DebateThumbnailComponent } from '../../../thumbnails/debates/debate-thumbnail/debate-thumbnail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-associated-debates',
  standalone: true,
  imports: [DebateThumbnailComponent, CommonModule],
  templateUrl: './associated-debates.component.html',
  styleUrl: './associated-debates.component.scss'
})
export class AssociatedDebatesComponent {

  @Input() topicId!: string;
  debates: Debate[] = [];

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit() {
    this.getDebates();
  }

  getDebates() {
    this.apiHandler.getDebatesByTopicId(this.topicId).
      subscribe({
        next: (response: any) => {
          this.debates = response;
        },
        error: (error: any) => {
        }
      });
  }

}
