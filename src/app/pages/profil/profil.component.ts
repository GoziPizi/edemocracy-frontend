import { Component } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {

  constructor(
    private apiHandler: ApiHandlerService
  ) {
  }

  logout(){
    this.apiHandler.logout();
  }

}
