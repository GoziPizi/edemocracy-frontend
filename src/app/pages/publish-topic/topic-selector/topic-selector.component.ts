import { Component } from '@angular/core';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Topic } from '../../../models/topics';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { TopicSelectorResultComponent } from './topic-selector-result/topic-selector-result.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, TopicSelectorResultComponent],
  templateUrl: './topic-selector.component.html',
  styleUrl: './topic-selector.component.scss'
})
export class TopicSelectorComponent {

  topicId: string = '';
  selectedTopic: Topic | null = null;

  searchTerm: string = '';
  searchTerm$ = new Subject<string>();

  searchResults: Topic[] = [];

  waitingForSearchResult: boolean = false;


  constructor(
    private apiHandler: ApiHandlerService,
    private route: ActivatedRoute
  ) {
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.apiHandler.textSearchByType(term, 'topic'))
    ).subscribe({
      next: this.handleResults,
      error: (err) => {
        this.waitingForSearchResult = false;
      }
    });
    this.route.queryParams.subscribe(params => {
      if(params['topicId']){
        this.topicId = params['topicId'];
        this.apiHandler.getTopicById(this.topicId).subscribe({
          next: (res: any) => {
            this.selectedTopic = res;
          }
        });
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
    console.log(this.searchResults);
    this.waitingForSearchResult = false;
  }

  unselectTopic() {
    this.selectedTopic = null;
    this.topicId = '';
  }

  selectTopic(topic: Topic) {
    this.selectedTopic = topic;
    this.topicId = topic.id;
    this.searchTerm = '';
  }

}
