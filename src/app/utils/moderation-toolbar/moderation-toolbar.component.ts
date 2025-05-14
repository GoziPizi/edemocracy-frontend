import { Component, Input } from '@angular/core';
import { ModerationService } from '../../services/moderation.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiHandlerService } from '../../services/api-handler.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-moderation-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './moderation-toolbar.component.html',
  styleUrl: './moderation-toolbar.component.scss'
})
export class ModerationToolbarComponent {

  @Input() public copyType?: string;

  constructor(
    public moderationService: ModerationService,
    private Route: ActivatedRoute,
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService
  ) {

  }

  copy() {
    this.moderationService.setCopyContent(this.Route.snapshot.params['id']);
  }

  fusion() {
    this.loadingService.increment();
    if (this.moderationService.copyContent) {
      if(this.copyType === 'debate') {
        this.apiHandler.mergeDebateIntoAnother(this.Route.snapshot.params['id'], this.moderationService.copyContent).subscribe({
          next: () => {
            this.loadingService.decrement();
            this.refreshPage();
          },
          error: () => {
            this.loadingService.decrement();
          }
        });
      }
    }
  }

  refreshPage() {
    window.location.reload();
  }

}
