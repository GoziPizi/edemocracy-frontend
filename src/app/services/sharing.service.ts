import { Injectable } from '@angular/core';
import { ToasterService } from './toaster.service';
import { ApiHandlerService } from './api-handler.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  constructor(
    private toasterService: ToasterService,
    private apiHandlerService: ApiHandlerService
  ) {}

  shareDebate(debateId: string) {
    const site_url = environment.site_url;
    const sponsorshipCode = this.apiHandlerService.user?.sponsorshipCode;
    let url = `${site_url}/debate/${debateId}`;
    if (sponsorshipCode) {
      url += `?sponsorshipCode=${sponsorshipCode}`;
    }
    navigator.clipboard
      .writeText(url)
      .then(() => {
        this.toasterService.success('Lien copié dans le presse-papier');
      })
      .catch((err) => {
        this.toasterService.error('Erreur lors de la copie du texte');
      });
  }

  shareTopic(topicId: string) {
    const site_url = environment.site_url;
    const sponsorshipCode = this.apiHandlerService.user?.sponsorshipCode;
    let url = `${site_url}/topic/${topicId}`;
    if (sponsorshipCode) {
      url += `?sponsorshipCode=${sponsorshipCode}`;
    }
    navigator.clipboard
      .writeText(url)
      .then(() => {
        this.toasterService.success('Lien copié dans le presse-papier');
      })
      .catch((err) => {
        this.toasterService.error('Erreur lors de la copie du texte');
      });
  }

  shareSponsorshipCode() {
    const sponsorshipCode = this.apiHandlerService.user?.sponsorshipCode;
    if (!sponsorshipCode) {
      this.toasterService.error('Impossible de créer un lien de parrainage');
      return;
    }
    navigator.clipboard
      .writeText(
        `${environment.site_url}/register?sponsorshipCode=${sponsorshipCode}`
      )
      .then(() => {
        this.toasterService.success('Lien copié dans le presse-papier');
      })
      .catch((err) => {
        this.toasterService.error('Erreur lors de la copie du texte');
      });
  }
}
