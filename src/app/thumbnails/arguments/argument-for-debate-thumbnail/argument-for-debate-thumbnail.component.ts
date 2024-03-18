import { Component, Input } from '@angular/core';
import { Argument } from '../../../models/argument';
import { CommonModule } from '@angular/common';
import { ApiHandlerService } from '../../../services/api-handler.service';

@Component({
  selector: 'app-argument-for-debate-thumbnail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './argument-for-debate-thumbnail.component.html',
  styleUrl: './argument-for-debate-thumbnail.component.scss'
})
export class ArgumentForDebateThumbnailComponent {

  @Input() argument!: Argument;

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  onVoteDown() {
    if(this.argument.hasVote === false) {
      this.apiHandler.deleteVote(this.argument.id).subscribe(() => {
        this.fetchArgument();
      });
    }
    this.apiHandler.voteDown(this.argument.id).subscribe(() => {
      this.fetchArgument();
    });
  }

  onVoteUp() {
    if(this.argument.hasVote) {
      this.apiHandler.deleteVote(this.argument.id).subscribe(() => {
        this.fetchArgument();
      });
    }
    this.apiHandler.voteUp(this.argument.id).subscribe(() => {
      this.fetchArgument();
    });
  }

  fetchArgument() {
    this.apiHandler.getArgument(this.argument.id).subscribe({
      next: (arg: any) => {
        this.argument = arg;
      }
    });
  }

  get hasVotes() {
    if(this.argument.hasVote === null) {
      return false;
    }
    return true;
  }

}
