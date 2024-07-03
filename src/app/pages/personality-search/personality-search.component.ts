import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalitySearchFormComponent } from './personality-search-form/personality-search-form.component';
import { ApiHandlerService } from '../../services/api-handler.service';
import { PersonalityWithUser } from '../../models/personality';
import { PersonalityResultThumbnailComponent } from './personality-result-thumbnail/personality-result-thumbnail.component';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-personality-search',
  standalone: true,
  imports: [PersonalitySearchFormComponent, PersonalityResultThumbnailComponent, CommonModule],
  templateUrl: './personality-search.component.html',
  styleUrl: './personality-search.component.scss'
})
export class PersonalitySearchComponent {

  @ViewChild('searchForm') personalitySearchForm: PersonalitySearchFormComponent | undefined

  personalityList: PersonalityWithUser[] = [];

  hasResearched = false;

  constructor(
    private apiHandlerService: ApiHandlerService,
    private loadingService: LoadingService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.onSubmit()
  }

  onSubmit() {
    this.hasResearched = true;
    const criteria = this.personalitySearchForm ? this.personalitySearchForm.getCriterias() : {}
    this.loadingService.increment();
    this.apiHandlerService.searchPersonalities(criteria).subscribe({
      next: (response: any) => {
        this.loadingService.decrement();
        this.personalityList = response;
      },
      error: (error: any) => {
        this.loadingService.decrement();
        this.toasterService.error('Erreur lors de la recherche des personnalités');
        console.error(error);
      }
    });
  }

}
