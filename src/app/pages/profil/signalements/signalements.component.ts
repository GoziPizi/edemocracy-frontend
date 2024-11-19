import { Component } from '@angular/core';
import { personalReport } from '../../../models/moderation/reports';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { ContestPopupComponent } from "./contest-popup/contest-popup.component";

@Component({
  selector: 'app-signalements',
  standalone: true,
  imports: [CommonModule, ContestPopupComponent],
  templateUrl: './signalements.component.html',
  styleUrl: './signalements.component.scss'
})
export class SignalementsComponent {

  //TODO faire en sorte que l'on ne puisse pas spammer les contestations

  signalements: personalReport[] = [];
  contestPopup: Boolean = false;

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
        console.log(reports);
      },
      error: (error:any) => {
        console.error(error);
      }
    })
  }

  contest(sanctionId: string) {
    //TODO
    this.contestPopup = true;
  }

  closePopup() {
    //TODO
    this.contestPopup = false;
  }

}
