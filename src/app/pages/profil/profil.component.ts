import { Component } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { User } from '../../models/users';
import { Party } from '../../models/party';
import { Personality } from '../../models/personality';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {

  userProfil: User = new User();
  userParty: Party | null = null;
  userPersonality: Personality | null = null;
  follows: string[] = [];

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(){
    this.fetchUserProfil();
    this.fetchUserParty();
    this.fetchUserPersonality();
  }

  fetchUserProfil(){
    this.loadingService.increment();
    this.apiHandler.getUser().subscribe((data: User) => {
      this.userProfil = data;
      this.loadingService.decrement();
    });
  }

  fetchUserParty(){
    this.loadingService.increment();
    this.apiHandler.getUserParty().subscribe((data: Party) => {
      this.userParty = data;
      this.loadingService.decrement();
    });
  }

  fetchUserPersonality(){
    this.loadingService.increment();
    this.apiHandler.getUserPersonality().subscribe((data: Personality) => {
      this.userPersonality = data;
      this.loadingService.decrement();
    });
  }

  logout(){
    this.apiHandler.logout();
  }

}
