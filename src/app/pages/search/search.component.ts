import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHandlerService } from '../../services/api-handler.service';
import { SearchResult } from '../../models/searchResult';
import { LoadingService } from '../../services/loading.service';
import { SearchItemComponent } from '../../utils/header/search-header/search-item/search-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchItemComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  query = '';
  searchResult: SearchResult[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService
  ) {
    this.route.queryParams.subscribe(params => {
      this.query = params['searchTerm'];
      this.fetchSearchResults();
    });
  }

  fetchSearchResults() {
    this.loadingService.increment()
    this.apiHandler.textSearch(this.query).subscribe({
      next: (res) => {
        this.searchResult = res;
        this.loadingService.decrement()
      },
      error: (err) => {
        this.loadingService.decrement()
      }
    });
  }

}
