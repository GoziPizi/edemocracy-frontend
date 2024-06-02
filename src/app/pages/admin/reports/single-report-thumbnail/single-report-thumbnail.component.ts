import { Component, Input } from '@angular/core';
import { ApiHandlerService } from '../../../../services/api-handler.service';
import { Report, ReportType } from '../../../../models/report';
import { CommonModule } from '@angular/common';
import { SingleArgumentReportThumbnailComponent } from './single-argument-report-thumbnail/single-argument-report-thumbnail.component';
import { SingleCommentReportThumbnailComponent } from './single-comment-report-thumbnail/single-comment-report-thumbnail.component';
import { SingleReformulationReportThumbnailComponent } from './single-reformulation-report-thumbnail/single-reformulation-report-thumbnail.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-single-report-thumbnail',
  standalone: true,
  imports: [CommonModule, RouterModule, SingleArgumentReportThumbnailComponent, SingleCommentReportThumbnailComponent, SingleReformulationReportThumbnailComponent],
  templateUrl: './single-report-thumbnail.component.html',
  styleUrl: './single-report-thumbnail.component.scss'
})
export class SingleReportThumbnailComponent {

  @Input() report!: Report;

  reportTypes = ReportType;

  constructor(
    private apiService: ApiHandlerService
  ) {
  }

  reloadPage() {
    window.location.reload();
  }

  isDisplayed(type: ReportType) {
    const reportType = this.report.entityType;
    //weird stuff with enums
    return ReportType[reportType] as any === type;
  }

  deleteEntity() {
    this.apiService.deleteEntity(this.report.id).subscribe({
      next: () => {
        this.reloadPage();
      },
      error: (error) => {
        console.error('Echec de la suppression', error);
      }
    })
  }

  ignoreReport() {
    this.apiService.ignoreReport(this.report.id).subscribe({
      next: () => {
        this.reloadPage();
      },
      error: (error) => {
        console.error('Echec de l\'ignorance du signalement', error);
      }
    })
  }

}
