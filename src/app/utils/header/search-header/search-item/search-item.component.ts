import { Component, Input } from '@angular/core';
import { SearchResult } from '../../../../models/searchResult';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss'
})
export class SearchItemComponent {

  @Input() searchItem!: SearchResult
  
  constructor(
    private router: Router
  ) { }

  navigateToItem(){
    let route: string;
    switch(this.searchItem.type){
      case 'Personality':
        route = 'personalites';
        break;
      case 'Party':
        route = 'partis';
        break;
      case 'Topic':
        route = 'topic';
        break;
      default:
        route = '/search';
    }
    this.router.navigate([route, this.searchItem.id])
  }

  loadBackupImage(){
    this.searchItem.picture = '../../../assets/E-Democracy..png';
  }

  get image(){
    if(this.searchItem.picture && this.searchItem.picture !== ''){
      return this.searchItem.picture;
    }
    return '../../../assets/E-Democracy..png';
  }
}
