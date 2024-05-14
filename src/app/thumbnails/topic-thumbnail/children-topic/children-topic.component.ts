import { Component, Input } from '@angular/core';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Topic } from '../../../models/topics';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-children-topic',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './children-topic.component.html',
  styleUrl: './children-topic.component.scss'
})
export class ChildrenTopicComponent {

  @Input() childrenTopicId!: string;
  childrenTopic: Topic = new Topic();
  showChildrenTopics: boolean = false;
  showArrow: boolean = false;

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit() {
    this.getTopic();
  }

  updateTopic(topicId: string) {
    this.childrenTopicId = topicId;
    this.getTopic();
  }

  getTopic() {
    this.apiHandler.getTopicById(this.childrenTopicId).
      subscribe({
        next: (response: any) => {
          this.childrenTopic = response;
          this.showArrow = this.childrenTopic.childrenId.length > 0;
        },
        error: (error: any) => {
        }
      });
  }

  toggleChildrenTopics() {
    this.showChildrenTopics = !this.showChildrenTopics;
  }

  clickLink(event: any){
    event.stopPropagation();
  }

  get childrenTopicTitle() {
    if(this.childrenTopic) {
      return this.childrenTopic.title;
    }
    return '';
  }

}
