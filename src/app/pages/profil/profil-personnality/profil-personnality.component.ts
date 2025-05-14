import { Component, ViewChild } from '@angular/core';
import { Personality } from '../../../models/personality';
import { LoadingService } from '../../../services/loading.service';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { ToasterService } from '../../../services/toaster.service';
import { Router } from '@angular/router';
import { DebateThumbnailComponent } from '../../../thumbnails/debates/debate-thumbnail/debate-thumbnail.component';
import { Debate } from '../../../models/debate';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profil-personnality',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DebateThumbnailComponent,
  ],
  templateUrl: './profil-personnality.component.html',
  styleUrl: './profil-personnality.component.scss',
})
export class ProfilPersonnalityComponent {
  @ViewChild('personalityDescription') personalityDescription: any;

  userPersonality: Personality | null = null;
  isPersonalityModified: boolean = false;
  debates: Debate[] = [];

  updatePersonnalityForm = new FormGroup({
    pseudo: new FormControl('', [Validators.nullValidator]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  constructor(
    private loadingService: LoadingService,
    private apiHandler: ApiHandlerService,
    private toasterService: ToasterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchUserPersonality();
  }

  fetchUserPersonality() {
    this.loadingService.increment();
    this.apiHandler.getUserPersonality().subscribe({
      next: (data: Personality) => {
        this.userPersonality = data;
        this.updateForm();
        this.loadingService.decrement();
        this.fetchDebates();
      },
      error: (error) => {
        this.toasterService.error(
          'Une erreur est survenue lors de la récupération de votre profil de personnalité.'
        );
        this.loadingService.decrement();
      },
    });
  }

  updateForm() {
    this.updatePersonnalityForm.patchValue({
      pseudo: this.userPersonality!.pseudo,
      description: this.userPersonality!.description,
    });
  }

  createPersonality() {
    this.loadingService.increment();
    this.apiHandler.becomePersonality().subscribe(() => {
      this.toasterService.success(
        'Vous êtes désormais une personnalité publique.'
      );
      this.fetchUserPersonality();
      this.loadingService.decrement();
    });
  }

  onPersonalityDescriptionChange() {
    this.isPersonalityModified = true;
  }

  onPersonalityPseudoChange() {
    this.isPersonalityModified = true;
  }

  updatePersonality() {
    this.loadingService.increment();
    const form = this.updatePersonnalityForm.value;
    if (form.pseudo === '') {
      form.pseudo = null;
    }
    console.log('Updating personality with form:', form);
    this.apiHandler.updatePersonality(form).subscribe({
      next: () => {
        this.toasterService.success('Profil mis à jour');
        this.isPersonalityModified = false;
        this.fetchUserPersonality();
        this.loadingService.decrement();
      },
      error: () => {
        this.toasterService.error('Erreur lors de la mise à jour du profil');
        this.loadingService.decrement();
      },
    });
  }

  createDebate() {
    this.router.navigate(['/debate/create'], {
      queryParams: { personalityCreatorId: this.userPersonality!.id },
      queryParamsHandling: 'merge',
    });
  }

  fetchDebates() {
    this.apiHandler
      .getPersonalityPersonalDebates(this.userPersonality!.id)
      .subscribe((debates: any) => {
        this.debates = debates;
      });
  }

  makeDebateFirst(debateId: string) {
    this.apiHandler
      .setFirstDebateDisplayForPersonality(this.userPersonality!.id)
      .subscribe({
        next: () => {
          this.toasterService.success('Débat mis en avant');
        },
        error: () => {
          this.toasterService.error('Erreur lors de la mise en avant du débat');
        },
      });
  }
}
