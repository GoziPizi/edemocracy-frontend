import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';

@Injectable({
  providedIn: 'root'
})

export class DonationSiderService {
  
  visible: boolean = true;  // Par défaut, le sider est visible

  constructor(
    private apiHandler: ApiHandlerService
  ) {
    // Vérifie dans les cookies au moment de l'initialisation
    this.checkSiderStatus();
  }

  // Fonction pour vérifier dans le cookie si le sider a été fermé dans les 2 derniers jours
  checkSiderStatus(): void {

    console.log('Current time - 59 days', new Date().getTime() - 60 * 24 * 60 * 60 * 1000);

    // Vérifie si l'utilisateur est connecté
    if(!this.apiHandler.isLogged.value) {
      this.visible = false;  // Cache le sider si l'utilisateur n'est pas connecté
      return;
    }

    const siderClosedTimestamp = localStorage.getItem('siderClosed');
    
    if (siderClosedTimestamp) {
      const closedDate = new Date(parseInt(siderClosedTimestamp, 10));
      const currentDate = new Date();

      // Vérifie si la différence entre la date actuelle et la date de fermeture est inférieure à 2 jours
      const diffInDays = (currentDate.getTime() - closedDate.getTime()) / (1000 * 3600 * 24);
      if (diffInDays < 2) {
        this.visible = false;  // Cache le sider si l'utilisateur l'a fermé dans les 2 derniers jours
        return
      }
    }

    const lastDonation = localStorage.getItem('lastDonation');

    if(lastDonation) {
      const lastDonationDate = new Date(parseInt(lastDonation, 10));
      const currentDate = new Date();

      const diffInDays = (currentDate.getTime() - lastDonationDate.getTime()) / (1000 * 3600 * 24);
      if (diffInDays < 60) {
        this.visible = false;
        return
      }
    }
  }

  // Fonction pour fermer le sider et définir un cookie valable 2 jours
  closeSider(): void {
    this.visible = false;
    const currentTimestamp = new Date().getTime();
    localStorage.setItem('siderClosed', currentTimestamp.toString());
  }

  setDonationDateToNow(): void {
    const currentTimestamp = new Date().getTime();
    localStorage.setItem('lastDonation', currentTimestamp.toString());
  }
}
