import { Component } from '@angular/core';
import { SearchResult } from '../../../models/searchResult';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchItemComponent } from './search-item/search-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-header',
  standalone: true,
  imports: [CommonModule, SearchItemComponent, FormsModule],
  templateUrl: './search-header.component.html',
  styleUrl: './search-header.component.scss'
})
export class SearchHeaderComponent {

  searchTerm: string = '';
  searchTerm$ = new Subject<string>();

  searchResults: SearchResult[] = [];

  waitingForSearchResult: boolean = false;

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router
  ) 
  {
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.apiHandler.textSearch(term))
    ).subscribe({
      next: this.handleResults,
      error: (err) => {
        this.waitingForSearchResult = false;
      }
    });
  }

  onSearchTermChange() {
    if(this.searchTerm !== ''){
      this.searchTerm$.next(this.searchTerm);
      this.waitingForSearchResult = true;
      return;
    }
    this.waitingForSearchResult = false;
  }

  handleResults = (res: any) => {
    this.searchResults = res.slice(0, 5);
    this.waitingForSearchResult = false;
  }

  onKeyDown(event: any) {
    if(event.key === 'Enter') {
      this.router.navigate(['/search'], {queryParams: {searchTerm: this.searchTerm}});
    }
  }

  navigateToSearch() {
    this.router.navigate(['/search'], {queryParams: {searchTerm: this.searchTerm}});
  }

}
