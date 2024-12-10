import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { reportEvent } from '../../../../models/moderation/reports';
import { ApiHandlerService } from '../../../../services/api-handler.service';

@Component({
  selector: 'app-report-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-history.component.html',
  styleUrl: './report-history.component.scss'
})
export class ReportHistoryComponent {

  reportEvents: reportEvent[] = [];

  constructor(
    private Router: Router,
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit() {
    this.fetchReportEvents();
  }

  fetchReportEvents() {
    this.apiHandler.getHistoric().subscribe({
      next: (data:any) => {
        this.reportEvents = data;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  navigateToModeration() {
    this.Router.navigate(['admin', 'moderation'])
  }

  navigateToModeration2() {
    this.Router.navigate(['admin', 'moderation', 'moderation2'])
  }

  navigateToReport(reportId: string) {
    this.Router.navigate(['admin', 'moderation', 'reports', reportId])
  }

  navigatToMederatorHistoric() {
    this.Router.navigate(['admin', 'moderation', 'moderator-historic'])
  }

  getEventType(event: reportEvent) {
    if(event.type === "contest") {
      return "Contestation"
    }
    return event.type
  }


}
