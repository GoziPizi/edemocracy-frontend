import { Component, ViewEncapsulation } from '@angular/core';
import { PoliticSides } from '../../../enums/politicSides';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { politicSideMapper } from '../../../mappers/politicside-mapper';
import { PersonalitySearchCriteria } from '../../../models/criterias';

@Component({
  selector: 'app-personality-search-form',
  standalone: true,
  imports: [NgSelectModule, FormsModule],
  templateUrl: './personality-search-form.component.html',
  styleUrl: './personality-search-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PersonalitySearchFormComponent {

  politicSide: PoliticSides = PoliticSides.CENTER;
  politicSideOptions: string[] = Object.values(PoliticSides);

  for: string[] = [];
  against: string[] = [];
  topicOptions: string[] = ['ecologie', 'economie', 'sante', 'education']

  public getCriterias(): PersonalitySearchCriteria {
    let criteria: PersonalitySearchCriteria = new PersonalitySearchCriteria();
    criteria.politicSide = politicSideMapper(this.politicSide);
    if (this.for.length > 0) {
      criteria = {...criteria, for: this.for}
    }
    if (this.against.length > 0) {
      criteria = {...criteria, against: this.against}
    }
    console.log(criteria);
    return criteria;
  }

}
