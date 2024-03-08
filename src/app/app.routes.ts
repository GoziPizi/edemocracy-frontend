import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./pages/accueil/accueil.component').then(m => m.AccueilComponent) },
    { path: '**', redirectTo: 'home' }
];
