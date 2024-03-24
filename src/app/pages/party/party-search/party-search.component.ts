import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PartySearchFormComponent } from './party-search-form/party-search-form.component';
import { Party } from '../../../models/party';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { PartyResultThumbnailComponent } from './party-result-thumbnail/party-result-thumbnail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-party-search',
  standalone: true,
  imports: [RouterModule, CommonModule, PartySearchFormComponent, PartyResultThumbnailComponent],
  templateUrl: './party-search.component.html',
  styleUrl: './party-search.component.scss'
})
export class PartySearchComponent {

  @ViewChild('searchForm') partySearchForm!: PartySearchFormComponent;

  partyList: Party[] = [];

  constructor(
    private apiHandler: ApiHandlerService
  ) {
  }

  onSubmit() {
    const criteria = this.partySearchForm.getCriterias();
    this.apiHandler.searchParties(criteria).subscribe((response: any) => {
      this.partyList = response;
      console.log('Party list: ', this.partyList);
    });
  }

}
