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
    if(this.argument.hasVote === false){
      this.apiHandler.deleteVote(this.argument.id).subscribe(() => {
        this.argument.hasVote = null;
        this.argument.nbBad--;
      });
      return;
    }
    if(this.argument.hasVote === true){
      this.apiHandler.deleteVote(this.argument.id).subscribe(() => {
        this.argument.hasVote = null;
        this.argument.nbGood--;
        this.onVoteDown();
      });
      return;
    }
    this.apiHandler.voteDown(this.argument.id).subscribe(() => {
      this.argument.hasVote = false;
      this.argument.nbBad++;
    });
  }

  onVoteUp() {
    if(this.argument.hasVote === true){
      this.apiHandler.deleteVote(this.argument.id).subscribe(() => {
        this.argument.hasVote = null;
        this.argument.nbGood--;
      });
      return;
    }
    if(this.argument.hasVote === false){
      this.apiHandler.deleteVote(this.argument.id).subscribe(() => {
        this.argument.hasVote = null;
        this.argument.nbBad--;
        this.onVoteUp();
      });
      return;
    }
    this.apiHandler.voteUp(this.argument.id).subscribe(() => {
      this.argument.hasVote = true;
      this.argument.nbGood++;
    });
  }

  get hasVotes() {
    if(this.argument.hasVote === null) {
      return false;
    }
    return true;
  }

}
