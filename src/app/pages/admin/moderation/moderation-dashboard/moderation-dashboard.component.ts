import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { report } from '../../../../models/moderation/reports';
import { ApiHandlerService } from '../../../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { SingleReportOverviewComponent } from '../../single-report-overview/single-report-overview.component';

@Component({
  selector: 'app-moderation-dashboard',
  standalone: true,
  imports: [SingleReportOverviewComponent, CommonModule],
  templateUrl: './moderation-dashboard.component.html',
  styleUrl: './moderation-dashboard.component.scss'
})
export class ModerationDashboardComponent {

  reports: report[] = [];

  constructor(
    private router: Router,
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit() {
    this.fetchReports();
  }

  navigateToAdmin() {
    this.router.navigate(['admin']);
  }

  navigateToModeration2Panel() {
    this.router.navigate(['admin/moderation2-panel']);
  }

  navigateToModeratorStaff() {
    this.router.navigate(['admin', 'moderation', 'staff'])
  }

  fetchReports() {
    this.apiHandler.getRecentReports().subscribe({
      next: (reports: any) => {
        this.reports = reports;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  get role() {
    return this.apiHandler.role;
  }

}
