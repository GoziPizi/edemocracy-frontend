import { Component, Input } from '@angular/core';
import { Debate, DebateDescriptionReformulation, DebateReformulationVote } from '../../../models/debate';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { ToasterService } from '../../../services/toaster.service';
import { CommonModule } from '@angular/common';
import { VisitorService } from '../../../services/visitor.service';
import { ReportComponent } from '../../../utils/report/report.component';
import { ReportType } from '../../../models/report';
import { politicSideMapperEnumToUser } from '../../../mappers/politicside-mapper';

@Component({
  selector: 'app-single-reformulation-presentation',
  standalone: true,
  imports: [CommonModule, ReportComponent],
  templateUrl: './single-reformulation-presentation.component.html',
  styleUrl: './single-reformulation-presentation.component.scss'
})
export class SingleReformulationPresentationComponent {

  @Input() reformulation!: DebateDescriptionReformulation;

  actualVote: DebateReformulationVote | null = null;
  reportType = ReportType.REFORMULATION;

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

  get name() {
    if(this.reformulation?.userName) {
      return this.reformulation.userName;
    }
    return 'Anonyme';
  }

  get work () {
    if(this.reformulation?.userWork) {
      return ', ' + this.reformulation.userWork;
    }
    return '';
  }

  get politicSide() {
    if(this.reformulation?.userPoliticSide) {
      return ', ' + politicSideMapperEnumToUser(this.reformulation.userPoliticSide);
    }
    return '';
  }
}
