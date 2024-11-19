import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { report, reportEvent } from '../../../models/moderation/reports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

  id: string = this.route.snapshot.params['id'];
  report: report | null = null;
  reportEvents: reportEvent[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiHandler: ApiHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fetchReportDetails();
  }

  fetchReportDetails() {
    this.apiHandler.getReportDetails(this.id).subscribe({
      next: (data:any) => {
        this.reportEvents = data.events;
        this.report = data as report;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  navigateToReports() {
    this.router.navigate(['admin', 'moderation-dashboard'])
  }

  banUser() {
    this.apiHandler.postSanction(this.id, 'ban', "Parce que c'est comme ça").subscribe({
      next: (data) => {
        this.navigateToReports();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getEventType(event: reportEvent) {
    if(event.type === "contest") {
      return "Contestation"
    }
    return event.type
  }

}
