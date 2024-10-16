import { Component } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { LoadingService } from '../../services/loading.service';
import { User } from '../../models/users';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss'
})
export class PresentationComponent {

  userProfil: User = new User();
  isEditing: boolean = false;

  presentation: string = "";
  fondateur:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  constructor(
    private apiHandlerService: ApiHandlerService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.fetchPresentations();
    this.fetchUserProfil();
  }

  fetchPresentations() {
    //presentation
    this.loadingService.increment();
    this.apiHandlerService.getMainPresentation().subscribe({
      next: (response: any) => {
        const finalPresentation = response.content.replace(/\\n/g, '\n');
        this.presentation = finalPresentation;
        this.loadingService.decrement();
      },
      error: (error) => {
        this.loadingService.decrement();
        console.log(error);
      },
    })
    //foudnder
    this.loadingService.increment();
    this.apiHandlerService.getFounder().subscribe({
      next: (response: any) => {
        const finalFounder = response.content.replace(/\\n/g, '\n');
        this.fondateur = finalFounder;
        this.loadingService.decrement();
      },
      error: (error) => {
        this.loadingService.decrement();
        console.log(error);
      },
    })
  }

  fetchUserProfil(){
    this.loadingService.increment();
    this.apiHandlerService.getUser()!.subscribe({
      next: (data: User) => {
        this.userProfil = data;
        this.loadingService.decrement();
      },
      error: (error) => {
        this.loadingService.decrement();
      }
    });
  }

  setEditingMode() {
    this.isEditing = true;
  }

  onValidate() {
    this.loadingService.increment();
    this.apiHandlerService.updateMainPresentation(this.presentation, this.fondateur).subscribe({
      next: (response: any) => {
        this.isEditing = false;
        this.loadingService.decrement();
      },
      error: (error) => {
        this.loadingService.decrement();
        console.log(error);
      },
    })
  }

  get isAdmin() {
    return this.userProfil.role === 'ADMIN';
  }
}
