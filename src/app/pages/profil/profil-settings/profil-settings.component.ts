import { Component } from '@angular/core';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profil-settings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profil-settings.component.html',
  styleUrl: './profil-settings.component.scss'
})
export class ProfilSettingsComponent {

  popUpWindow: boolean = false;

  constructor(
    private apiHandler: ApiHandlerService
  ) {

  }

  onDeleteAccount(){
    this.popUpWindow = true;
  }

  onClosePopUp(){
    this.popUpWindow = false;
  }

  deleteAccount(){
    this.apiHandler.deleteUser().subscribe(() => {
      this.apiHandler.logout();
    });
  }

}
