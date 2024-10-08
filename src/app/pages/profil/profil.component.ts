import { Component, ViewChild } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { MembershipStatus, User } from '../../models/users';
import { Party } from '../../models/party';
import { Personality } from '../../models/personality';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProfilOpinionsComponent } from './profil-opinions/profil-opinions.component';
import { ProfilPersonalsComponent } from './profil-personals/profil-personals.component';
import { FormsModule } from '@angular/forms';
import { ToasterService } from '../../services/toaster.service';
import { ProfilSettingsComponent } from './profil-settings/profil-settings.component';
import { VisitorService } from '../../services/visitor.service';
import { FollowsComponent } from './follows/follows.component';
import { CotisationComponentComponent } from './cotisation-component/cotisation-component.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, RouterModule, ProfilOpinionsComponent, ProfilPersonalsComponent, FormsModule, ProfilSettingsComponent, FollowsComponent, CotisationComponentComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {

  @ViewChild('personalityDescription') personalityDescription: any;

  userProfil: User = new User();
  userPartis: Party[] = [];
  userPersonality: Personality | null = null;

  isPersonalityModified: boolean = false;

  opinions: boolean = false; 
  personals: boolean = false;
  settings: boolean = false;
  cotisation: boolean = false;
  partis: boolean = false;
  personality: boolean = false;
  followsOpen: boolean = false;

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService, 
    private toasterService: ToasterService,
    private visitorService: VisitorService,
    private router: Router
  ) {
  }

  ngOnInit(){
    if (this.visitorService.isVisitor) {
      this.router.navigate(['/accueil']);
      this.loadingService.reset();
    }
    this.apiHandler.getUser()!.subscribe({
      next: (data: User) => {
      },
      error: (error) => {
        this.toasterService.error('Une erreur est survenue lors de la récupération de votre profil.');
      }
    });
    this.fetchUserProfil();
    this.fetchUserPartis();
    this.fetchUserPersonality();
  }

  fetchUserProfil(){
    this.loadingService.increment();
    this.apiHandler.getUser()!.subscribe({
      next: (data: User) => {
        this.userProfil = data;
        this.loadingService.decrement();
      },
      error: (error) => {
        this.toasterService.error('Une erreur est survenue lors de la récupération de votre profil.');
        this.loadingService.decrement();
      }
    });
  }

  fetchUserPartis(){
    this.loadingService.increment();
    this.apiHandler.getUserPartis().subscribe({
      next: (data: Party[]) => {
        this.userPartis = data;
        this.loadingService.decrement();
      },
      error: (error) => {
        this.toasterService.error('Une erreur est survenue lors de la récupération de vos partis.');
        this.loadingService.decrement();
      }
    });
  }

  onPersonalityDescriptionChange(){
    this.isPersonalityModified = true;
  }

  fetchUserPersonality(){
    this.loadingService.increment();
    this.apiHandler.getUserPersonality().subscribe({
      next: (data: Personality) => {
        this.userPersonality = data;
        this.loadingService.decrement();
      },error: (error) => {
        this.toasterService.error('Une erreur est survenue lors de la récupération de votre profil de personnalité.');
        this.loadingService.decrement();
      }
    });
  }

  updatePersonality(){
    this.loadingService.increment();
    const description = this.personalityDescription.nativeElement.value;
    this.apiHandler.updatePersonalityDescription(description).subscribe(() => {
      this.toasterService.success('Votre description a été mise à jour.');
      this.loadingService.decrement();
      this.isPersonalityModified = false;
    });
  }

  createPersonality(){
    this.loadingService.increment();
    this.apiHandler.becomePersonality().subscribe(() => {
      this.toasterService.success('Vous êtes désormais une personnalité publique.');
      this.fetchUserPersonality();
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

  toggleSettings() {
    this.settings = !this.settings;
  }

  toggleCotisation() {
    this.cotisation = !this.cotisation;
  }

  togglePartis() {
    this.partis = !this.partis;
  }

  togglePersonality() {
    this.personality = !this.personality;
  }

  toggleFollows() {
    this.followsOpen = !this.followsOpen;
  }

  get contributionStatus(): MembershipStatus {
    return this.userProfil.contributionStatus;
  }
}
