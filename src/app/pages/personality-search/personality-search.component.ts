import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonalitySearchFormComponent } from './personality-search-form/personality-search-form.component';
import { ApiHandlerService } from '../../services/api-handler.service';
import { PersonalityWithUser } from '../../models/personality';
import { PersonalityResultThumbnailComponent } from './personality-result-thumbnail/personality-result-thumbnail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personality-search',
  standalone: true,
  imports: [PersonalitySearchFormComponent, PersonalityResultThumbnailComponent, CommonModule],
  templateUrl: './personality-search.component.html',
  styleUrl: './personality-search.component.scss'
})
export class PersonalitySearchComponent {

  @ViewChild('searchForm') personalitySearchForm!: PersonalitySearchFormComponent;

  personalityList: PersonalityWithUser[] = [];

  constructor(
    private apiHandlerService: ApiHandlerService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const criteria = this.personalitySearchForm.getCriterias();
    this.apiHandlerService.searchPersonalities(criteria).subscribe((response: any) => {
      this.personalityList = response;
    });
  }

}
