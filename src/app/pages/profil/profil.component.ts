import { Component } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { User } from '../../models/users';
import { Party } from '../../models/party';
import { Personality } from '../../models/personality';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfilOpinionsComponent } from './profil-opinions/profil-opinions.component';
import { ProfilPersonalsComponent } from './profil-personals/profil-personals.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, RouterModule, ProfilOpinionsComponent, ProfilPersonalsComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {

  userProfil: User = new User();
  userPartis: Party[] = [];
  userPersonality: Personality | null = null;
  follows: string[] = [];

  opinions: boolean = false; 
  personals: boolean = false;

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(){
    this.fetchUserProfil();
    this.fetchUserPartis();
    this.fetchUserPersonality();
  }

  fetchUserProfil(){
    this.loadingService.increment();
    this.apiHandler.getUser().subscribe((data: User) => {
      this.userProfil = data;
      this.loadingService.decrement();
    });
  }

  fetchUserPartis(){
    this.loadingService.increment();
    this.apiHandler.getUserPartis().subscribe((data: Party[]) => {
      this.userPartis = data;
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

  toggleOpinions() {
    this.opinions = !this.opinions;
  }

  togglePersonals() {
    this.personals = !this.personals;
  }

}
