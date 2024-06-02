import { Component, Input } from '@angular/core';
import { ApiHandlerService } from '../../../../../services/api-handler.service';
import { PartyComment } from '../../../../../models/partyComments';

@Component({
  selector: 'app-single-comment-report-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './single-comment-report-thumbnail.component.html',
  styleUrl: './single-comment-report-thumbnail.component.scss'
})
export class SingleCommentReportThumbnailComponent {

  @Input() commentId!: string;
  comment: PartyComment | undefined;

  constructor(
    private apiService: ApiHandlerService
  ) { }

  fetchComment() {
    this.apiService.getSinglePartyComment(this.commentId).subscribe({
      next: (comment:any) => this.comment = comment
    });
  }

}
