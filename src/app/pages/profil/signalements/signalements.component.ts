import { Component } from '@angular/core';
import { personalReport } from '../../../models/moderation/reports';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { SinglePersonalReportComponent } from "./single-personal-report/single-personal-report.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signalements',
  standalone: true,
  imports: [CommonModule, SinglePersonalReportComponent, FormsModule],
  templateUrl: './signalements.component.html',
  styleUrl: './signalements.component.scss'
})
export class SignalementsComponent {

  signalements: personalReport[] = [];
  contestPopup: Boolean = false;

  contestReason: string = '';
  contestReportingId: string = '';

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit() {
    this.fetchSignalements();
  }

  fetchSignalements() {
    this.apiHandler.getPersonalReports().subscribe({
      next: (reports:personalReport[]) => {
        this.signalements = reports;
      },
      error: (error:any) => {
        console.error(error);
      }
    })
  }

  contest(reportingId: string) {
    this.contestReportingId = reportingId;
    this.contestPopup = true;
  }

  handlePopUpClose() {
    this.closePopup();
    this.fetchSignalements();
  }

  closePopup() {
    this.contestPopup = false;
  }

  sendContest() {
    this.apiHandler.contestSanction(this.contestReportingId, this.contestReason).subscribe({
      next: (response:any) => {
        this.handlePopUpClose();
      },
      error: (error:any) => {
        console.error(error);
      }
    })
  }

  isDisabled(report: personalReport) {
    if(report.report.isModeration2Required && !report.report.isModerated2) {
      return true;
    }
    return false
  }

  get isBanned() {
    const bans = this.signalements.filter((report) => report.sanction.type === 'ban');
    //Check the date of the ban
    for (const ban of bans) {
      if(!ban.sanction.duration) {
        return true;
      }

      const duration = new Date(ban.sanction.duration * 60 * 60 * 1000);

      if(new Date(ban.sanction.createdAt).getTime() + duration.getTime() > Date.now()) {
        return true;
      }
    }
    return false;
  }

}
