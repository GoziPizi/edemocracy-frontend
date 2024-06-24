import { Component, ViewEncapsulation } from '@angular/core';
import { PoliticSides } from '../../../enums/politicSides';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { PersonalitySearchCriteria } from '../../../models/criterias';
import { TopicSearchItem } from '../../../models/topics';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { PoliticSideDropdownItem } from '../../../models/politicSides';
import { politicSideMapperEnumToUser } from '../../../mappers/politicside-mapper';

@Component({
  selector: 'app-personality-search-form',
  standalone: true,
  imports: [NgSelectModule, FormsModule],
  templateUrl: './personality-search-form.component.html',
  styleUrl: './personality-search-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PersonalitySearchFormComponent {

  politicSide?: PoliticSides;
  politicSideOptions: PoliticSideDropdownItem[] = [];

  for: string[] = [];
  against: string[] = [];
  topicOptions: TopicSearchItem[] = [];

  mapperEnumToString = politicSideMapperEnumToUser;

  constructor(
    private apiHandler: ApiHandlerService
  ) {
    const politicSides = Object.values(PoliticSides);
    this.politicSideOptions = politicSides.map((side: PoliticSides) => {
      return {
        value: side,
        label: politicSideMapperEnumToUser(side)
      }
    });
  }

  ngOnInit() {
    this.fetchTopics();
  }

  fetchTopics() {
    this.apiHandler.getTopicslist().subscribe(
      (topics: TopicSearchItem[]) => {
        this.topicOptions = topics;
      }
    );
  }

  public getCriterias(): PersonalitySearchCriteria {
    let criteria: PersonalitySearchCriteria = new PersonalitySearchCriteria();
    if(this.politicSide){
      criteria.politicSide = this.politicSide;
    }
    if (this.for.length > 0) {
      criteria = {...criteria, for: this.for}
    }
    if (this.against.length > 0) {
      criteria = {...criteria, against: this.against}
    }
    return criteria;
  }

}
