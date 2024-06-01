import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PartySearchFormComponent } from './party-search-form/party-search-form.component';
import { Party } from '../../../models/party';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { PartyResultThumbnailComponent } from './party-result-thumbnail/party-result-thumbnail.component';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../services/loading.service';
import { ToasterService } from '../../../services/toaster.service';
import { VisitorService } from '../../../services/visitor.service';

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
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService,
    private toasterService: ToasterService
  ) {
  }

  onSubmit() {
    const criteria = this.partySearchForm.getCriterias();
    this.loadingService.increment();
    this.apiHandler.searchParties(criteria).subscribe({
      next: (response: any) => {
        this.loadingService.decrement();
        this.partyList = response;
      },
      error: (error: any) => {
        this.loadingService.decrement();
        this.toasterService.error('Erreur lors de la recherche des partis');
        console.error(error);
      }
    });
  }

}
