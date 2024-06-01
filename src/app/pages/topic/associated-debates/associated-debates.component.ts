import { Component, Input } from '@angular/core';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Debate } from '../../../models/debate';
import { DebateThumbnailComponent } from '../../../thumbnails/debates/debate-thumbnail/debate-thumbnail.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VisitorService } from '../../../services/visitor.service';

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
    private apiHandler: ApiHandlerService, 
    private router: Router,
    private visitorService: VisitorService
  ) { }

  ngOnInit() {
    this.getDebates();
  }

  getDebates(): void {
    this.apiHandler.getDebatesByTopicId(this.topicId).
      subscribe({
        next: (response: any) => {
          this.debates = response;
        },
        error: (error: any) => {
        }
      });
  }

  updateTopic(topicId: string) {
    this.topicId = topicId;
    this.getDebates();
  }

  createDebate() {
    this.router.navigate(['/debate/create'], {
      queryParams: {topicId: this.topicId},
      queryParamsHandling: 'merge'
    })
  }

  get isVisitor() {
    return this.visitorService.isVisitor;
  }

}
