import { Component, Input } from '@angular/core';
import { personalReport } from '../../../../models/moderation/reports';
import { CommonModule } from '@angular/common';
import { ApiHandlerService } from '../../../../services/api-handler.service';

@Component({
  selector: 'app-single-personal-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-personal-report.component.html',
  styleUrl: './single-personal-report.component.scss'
})
export class SinglePersonalReportComponent {

  @Input() report!: personalReport;
  entity: any;

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  // ngOnInit() {
  //   this.fetchEntity();
  // }

  // fetchEntity() {
  //   this.apiHandler.getReportEntity(this.report.report.entityId).subscribe({})
  // }

  get sanction() {
    return this.report.sanction.type;
  }

  get reason() {
    if(this.report.sanction.reason === "") {
      return "Aucune raison donnée";
    }
    return this.report.sanction.reason;
  }

  get content() {
    return "Le contenu sera bientot visible ici";
  }

}
