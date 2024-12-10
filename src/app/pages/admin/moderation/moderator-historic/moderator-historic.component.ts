import { Component, ViewEncapsulation } from '@angular/core';
import { ApiHandlerService } from '../../../../services/api-handler.service';
import { LoadingService } from '../../../../services/loading.service';
import { ToasterService } from '../../../../services/toaster.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { reportEvent } from '../../../../models/moderation/reports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moderator-historic',
  standalone: true,
  imports: [NgSelectModule, CommonModule, FormsModule],
  templateUrl: './moderator-historic.component.html',
  styleUrl: './moderator-historic.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ModeratorHistoricComponent {

  moderators: { name: string, id: string }[] = [];
  selectedId: string = '';

  reportEvents: reportEvent[] = [];

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService,
    private toaster: ToasterService,
    private Router: Router
  ) { }

  ngOnInit() {
    this.fetchModerator();
  }

  fetchModerator() {
    this.loadingService.increment();
    this.apiHandler.getModerators().subscribe({
      next: (moderators) => {
        this.loadingService.decrement();
        this.moderators = moderators;
      },
      error: (error) => {
        this.loadingService.decrement();
        this.toaster.error('Error fetching moderators');
      }
    });
  }

  onSelectModerator(id: string) {
    this.fetchModeratorHistoric(id);
  }

  fetchModeratorHistoric(moderatorId: string) {
    this.loadingService.increment();
    this.apiHandler.getModeratorHistoric(moderatorId).subscribe({
      next: (historic:any) => {
        this.loadingService.decrement();
        this.reportEvents = historic;
      },
      error: (error) => {
        this.loadingService.decrement();
        this.toaster.error('Error fetching moderator historic');
      }
    });
  }

  navigateToHistoric() {
    this.Router.navigate(['admin', 'moderation', 'historic'])
  }

  navigateToReport(reportId: string) {
    this.Router.navigate(['admin', 'moderation', 'reports', reportId])
  }

  getEventType(event: reportEvent) {
    if(event.type === "contest") {
      return "Contestation"
    }
    return event.type
  }

}
