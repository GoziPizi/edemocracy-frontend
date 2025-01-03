import { Component, Input, ViewChild } from '@angular/core';
import { Debate, DebateResult } from '../../../models/debate';
import { ForAgainstDebateComponent } from "../../../pages/debate/for-against-debate/for-against-debate.component";
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Router } from '@angular/router';
import { DebateVote } from '../../../enums/voteDebate';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-debate-advanced-thumbnail',
  standalone: true,
  imports: [ForAgainstDebateComponent],
  templateUrl: './debate-advanced-thumbnail.component.html',
  styleUrl: './debate-advanced-thumbnail.component.scss'
})
export class DebateAdvancedThumbnailComponent {

  @Input() debate!: Debate;

  debateVote = DebateVote;

  @ViewChild('result') forAgainstDebateComponent!: ForAgainstDebateComponent;

  constructor(
    private apiHandlerService: ApiHandlerService,
    private Router: Router,
    private toastService: ToasterService
  ) { }

  ngOnInit() {
    this.fetchDebate();
  }

  fetchDebate() {
    this.apiHandlerService.getDebate(this.debate.id).subscribe(debate => {
      this.debate = debate;
      this.forAgainstDebateComponent.setDebateResult(debate.debateResult);
    });
  }

  navigateToDebate(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.Router.navigate(['/debate', this.debate.id]);
  }

  voteForDebate(event: any, vote: DebateVote) {
    event.preventDefault();
    event.stopPropagation();
    this.apiHandlerService.voteForDebate(this.debate.id, vote).subscribe(debate => {
      this.toastService.success("Vote enregistré");
      this.fetchDebate();
    });
  }

  get nbVotants(): number {
    if(this.debate.debateResult == null) {
      return 0;
    }
    return this.debate.debateResult.nbAgainst 
    + this.debate.debateResult.nbFor 
    + this.debate.debateResult.nbReallyAgainst 
    + this.debate.debateResult.nbReallyFor 
    + this.debate.debateResult.nbNeutral;
  }

}
