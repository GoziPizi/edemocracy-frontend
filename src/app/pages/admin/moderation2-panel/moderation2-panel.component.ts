import { Component } from '@angular/core';
import { report } from '../../../models/moderation/reports';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { ToasterService } from '../../../services/toaster.service';
import { SingleReportOverviewComponent } from '../single-report-overview/single-report-overview.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moderation2-panel',
  standalone: true,
  imports: [SingleReportOverviewComponent, CommonModule],
  templateUrl: './moderation2-panel.component.html',
  styleUrl: './moderation2-panel.component.scss'
})
export class Moderation2PanelComponent {

  reports: report[] = []

  constructor(
    private apiHandler: ApiHandlerService,
    private toastr: ToasterService
  ) {

  }

  ngOnInit() {
    this.fetchModeration2Reports()
  }

  fetchModeration2Reports() {
    this.apiHandler.getModeration2Reports().subscribe({
      next: (reports: report[]) => {
        this.reports = reports
        console.log(reports)
      },
      error: (error: any) => {
        this.toastr.error('Impossible de récupérer les signalements de niveau 2')
      }

    })
  }

  navigateToHistory() {
    //TODO implement
  }

}
