import { Component } from '@angular/core';
import { ReportingService } from '../../services/reporting.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiHandlerService } from '../../services/api-handler.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-reporting-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reporting-screen.component.html',
  styleUrl: './reporting-screen.component.scss'
})
export class ReportingScreenComponent {

  description: string = ""
  reason: string = ""
  options = [
    "Le contenu contient des propos haineux",
    "Le contenu contient des propos discriminatoires",
    "Le contenu contient des mots offensants", 
    "Le contenu n'a pas de rapport avec la discussion",
    "Le contenu fait de la publicité",
    "Le contenu est du spam"
  ]

  constructor(
    public reportingService: ReportingService,
    public apiHandlerService: ApiHandlerService,
    public toaster: ToasterService
  ) {

  }

  sendReport() {
    const data = {
      entityType: this.reportingService.entityType,
      entityId: this.reportingService.entityId,
      reason: this.reason + ". Commentaire : " + this.description
    }

    this.apiHandlerService.report(data).subscribe({
      next: () => {
        this.toaster.success('Votre signalement a été pris en compte.')
        this.reportingService.closeReportWindow();
      },
      error: () => {
        this.toaster.error('Erreur lors du signalement, veuillez réessayer')
        this.description = ""
      }
    })
    
  }



}
