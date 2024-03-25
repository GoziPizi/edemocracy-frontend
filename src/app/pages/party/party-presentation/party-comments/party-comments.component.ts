import { Component, Input } from '@angular/core';
import { ApiHandlerService } from '../../../../services/api-handler.service';
import { PartyCommentWithName } from '../../../../models/partyComments';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-party-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './party-comments.component.html',
  styleUrl: './party-comments.component.scss'
})
export class PartyCommentsComponent {

  @Input() partyId!: string;

  newCommentForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(500)])
  })

  comments: PartyCommentWithName[] = [];

  isAdmin: boolean = false;
  userId: string = '';

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService
  ) {
    this.userId = this.apiHandler.getUserId();
  }

  ngOnInit() {
    this.getComments();
    this.checkAdmin();
  }

  getComments() {
    this.apiHandler.getPartyComments(this.partyId).subscribe((comments: any) => {
      this.comments = comments;
    });
  }

  checkAdmin() {
    this.apiHandler.checkAdminPartyRights(this.partyId).subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
  }

  addComment() {
    this.loadingService.increment();
    if(this.newCommentForm.valid && this.newCommentForm.value.content) {
      this.apiHandler.postPartyComment(this.partyId, this.newCommentForm.value.content).subscribe({
        next: () => {
          this.loadingService.decrement();
          this.newCommentForm.reset();
          this.getComments();
        },
        error: () => {
          this.loadingService.decrement();
        }
      });
    }
  }

  deleteComment(commentId: string) {
    this.loadingService.increment();
    this.apiHandler.deletePartyComment(this.partyId, commentId).subscribe({
      next: () => {
        this.loadingService.decrement();
        this.getComments();
      },
      error: () => {
        this.loadingService.decrement();
      }
    });
  }
}
