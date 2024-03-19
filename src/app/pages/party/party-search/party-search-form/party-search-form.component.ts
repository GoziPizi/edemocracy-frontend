import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PoliticSides } from '../../../../enums/politicSides';
import { TopicSearchItem } from '../../../../models/topics';
import { ApiHandlerService } from '../../../../services/api-handler.service';
import { PartySearchCriteria } from '../../../../models/criterias';
import { politicSideMapperEnumToUser } from '../../../../mappers/politicside-mapper';
import { PoliticSideDropdownItem } from '../../../../models/politicSides';

@Component({
  selector: 'app-party-search-form',
  standalone: true,
  imports: [NgSelectModule, FormsModule],
  templateUrl: './party-search-form.component.html',
  styleUrl: './party-search-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PartySearchFormComponent {

  politicSide: PoliticSides = PoliticSides.CENTER;
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
    this.apiHandler.getParentsTopicSearchItems().subscribe(
      (topics: TopicSearchItem[]) => {
        this.topicOptions = topics;
      }
    );
  }

  public getCriterias(): PartySearchCriteria {
    let criteria: PartySearchCriteria = new PartySearchCriteria();
    criteria.politicSide = this.politicSide;
    if (this.for.length > 0) {
      criteria = {...criteria, for: this.for}
    }
    if (this.against.length > 0) {
      criteria = {...criteria, against: this.against}
    }
    return criteria;
  }

}
