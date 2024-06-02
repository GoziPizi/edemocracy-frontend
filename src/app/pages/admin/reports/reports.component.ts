import { Component } from '@angular/core';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Report } from '../../../models/report';
import { SingleReportThumbnailComponent } from './single-report-thumbnail/single-report-thumbnail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [SingleReportThumbnailComponent, CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

  reports: Report[] = []; 

  constructor(
    private apiService: ApiHandlerService
  ) { }

  ngOnInit() {
    console.log('ReportsComponent');
    this.apiService.getReports().subscribe({
      next: (reports: any) => {
        console.log(reports);
        this.reports = reports;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
