import { Component, Input } from '@angular/core';
import { Debate, DebateDescriptionReformulation, DebateReformulationVote } from '../../../models/debate';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { ToasterService } from '../../../services/toaster.service';
import { CommonModule } from '@angular/common';
import { VisitorService } from '../../../services/visitor.service';

@Component({
  selector: 'app-single-reformulation-presentation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-reformulation-presentation.component.html',
  styleUrl: './single-reformulation-presentation.component.scss'
})
export class SingleReformulationPresentationComponent {

  @Input() reformulation!: DebateDescriptionReformulation;

  actualVote: DebateReformulationVote | null = null;

  constructor(
    private apiHandler: ApiHandlerService,
    private toaster: ToasterService,
    private visitorService: VisitorService
  ) { }

  ngOnInit() {
    this.fetchReformulationVote();
  }

  fetchReformulationVote() {
    if(this.visitorService.isVisitor) return;
    this.apiHandler.getDebateReformulationVote(this.reformulation.id).subscribe({
      next: (vote: any) => {
        this.actualVote = vote;
      }
    });
  }

  refreshPage() {
    window.location.reload();
  }

  onLike() {
    if(this.hasVoteUp) {
      this.apiHandler.voteForReformulation(this.actualVote!.debateReformulationId, null).subscribe({
        next: () => {
            this.refreshPage();
        },
        error: (err) => {
          this.toaster.error(err.error.message);
        }
      });
    }
    else {
      this.apiHandler.voteForReformulation(this.reformulation.id, true).subscribe({
        next: (vote: any) => {
          this.refreshPage();
        },
        error: (err) => {
          this.toaster.error(err.error.message);
        }
      });
    }
  }

  onDislike() {
    if(this.hasVoteDown) {
      this.apiHandler.voteForReformulation(this.actualVote!.debateReformulationId, null).subscribe({
        next: () => {
          this.refreshPage();
        },
        error: (err) => {
          this.toaster.error(err.error.message);
        }
      });
    }
    else {
      this.apiHandler.voteForReformulation(this.reformulation.id, false).subscribe({
        next: (vote: any) => {
          this.refreshPage();
        },
        error: (err) => {
          this.toaster.error(err.error.message);
        }
      });
    }
  }

  get hasVoteUp() {
    return this.actualVote?.value === true;
  }

  get hasVoteDown() {
    return this.actualVote?.value === false;
  }

  get isVisitor() {
    return this.visitorService.isVisitor;
  }
}
