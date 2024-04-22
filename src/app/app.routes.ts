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
    { path: 'partis/:id/membres', loadComponent: () => import('./pages/party/party-members/party-members.component').then(m => m.PartyMembersComponent) },
    { path: 'create-party', loadComponent: () => import('./pages/party/party-create/party-create.component').then(m => m.PartyCreateComponent) },
    { path: 'modify-party/:id', loadComponent: () => import('./pages/party/modify-party/modify-party.component').then(m => m.ModifyPartyComponent) },

    { path: 'search', loadComponent: () => import('./pages/search/search.component').then(m => m.SearchComponent) },

    { path: 'topic/:id', loadComponent: () => import('./pages/topic/topic.component').then(m => m.TopicComponent) },

    { path: 'debate/create', loadComponent: () => import('./pages/debate/create-debate/create-debate.component').then(m => m.CreateDebateComponent)},
    { path: 'debate/:id', loadComponent: () => import('./pages/debate/debate.component').then(m => m.DebateComponent) },
    { path: 'debate', loadComponent: () => import('./pages/debate/debates-home/debates-home.component').then(m => m.DebatesHomeComponent) },

    { path: 'invitations', loadComponent: () => import('./pages/invitations/invitations.component').then(m => m.InvitationsComponent) },
    { path: 'invitation/:id', loadComponent: () => import('./pages/invitations/invitation/invitation.component').then(m => m.InvitationComponent) },

    { path: 'publish-topic', loadComponent: () => import('./pages/publish-topic/publish-topic.component').then(m => m.PublishTopicComponent) },

    { path: 'profil', loadComponent: () => import('./pages/profil/profil.component').then(m => m.ProfilComponent) },

    { path: 'admin', loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)},

    { path: '**', redirectTo: 'accueil' }
];
