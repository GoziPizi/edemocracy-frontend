import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'landing', loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent) },
    { path: 'connexion', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
    { path: 'inscription', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
    { path: 'accueil', loadComponent: () => import('./pages/accueil/accueil.component').then(m => m.AccueilComponent) },
    { path: 'personalites', loadComponent: () => import('./pages/personality-search/personality-search.component').then(m => m.PersonalitySearchComponent) },
    { path: 'personalites/:id', loadComponent: () => import('./pages/personality/personality.component').then(m => m.PersonalityComponent) },
    { path: 'partis', loadComponent: () => import('./pages/party-search/party-search.component').then(m => m.PartySearchComponent) },
    
    { path: '**', redirectTo: 'accueil' }
];
