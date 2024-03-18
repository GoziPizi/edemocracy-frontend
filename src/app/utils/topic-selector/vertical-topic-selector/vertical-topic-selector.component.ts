import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TopicSearchItem } from '../../../models/topics';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vertical-topic-selector',
  standalone: true,
  imports: [NgSelectModule, FormsModule],
  templateUrl: './vertical-topic-selector.component.html',
  styleUrl: './vertical-topic-selector.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class VerticalTopicSelectorComponent {

  @Input() selected: string[] = [];

  topics: TopicSearchItem[] = []

  constructor(
    private apiHandler: ApiHandlerService
  ) {
    this.fetchTopics();
  }

  fetchTopics() {
    //FIXME prendre tous les topics.
    this.apiHandler.getParentsTopicSearchItems().subscribe(
      (topics: TopicSearchItem[]) => {
        this.topics = topics;
      }
    );
  }

  updateSelectedTopics(topics: string[]) {
    this.selected = topics;
  }

  getTopics() {
    return this.selected;
  }

}
