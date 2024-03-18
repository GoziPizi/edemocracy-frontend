import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    { path: 'landing', loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent) },
    { path: 'connexion', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
    { path: 'inscription', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },

    { path: 'accueil', loadComponent: () => import('./pages/accueil/accueil.component').then(m => m.AccueilComponent) },

    { path: 'personalites', loadComponent: () => import('./pages/personality-search/personality-search.component').then(m => m.PersonalitySearchComponent) },
    { path: 'personalites/:id', loadComponent: () => import('./pages/personality/personality.component').then(m => m.PersonalityComponent) },

    { path: 'partis', loadComponent: () => import('./pages/party/party-search/party-search.component').then(m => m.PartySearchComponent) },
    { path: 'partis/:id', loadComponent: () => import('./pages/party/party-presentation/party-presentation.component').then(m => m.PartyPresentationComponent) },
    { path: 'create-party', loadComponent: () => import('./pages/party/party-create/party-create.component').then(m => m.PartyCreateComponent) },
    { path: 'modify-party/:id', loadComponent: () => import('./pages/party/modify-party/modify-party.component').then(m => m.ModifyPartyComponent) },

    { path: 'topic/:id', loadComponent: () => import('./pages/topic/topic.component').then(m => m.TopicComponent) },
    { path: 'debate/:id', loadComponent: () => import('./pages/debate/debate.component').then(m => m.DebateComponent) },
    { path: 'profil', loadComponent: () => import('./pages/profil/profil.component').then(m => m.ProfilComponent) },
    { path: '**', redirectTo: 'accueil' }
];
