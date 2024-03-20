import { Component, ViewChild } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { Topic } from '../../models/topics';
import { ActivatedRoute } from '@angular/router';
import { ChildrenTopicComponent } from '../../thumbnails/topic-thumbnail/children-topic/children-topic.component';
import { CommonModule } from '@angular/common';
import { AssociatedDebatesComponent } from './associated-debates/associated-debates.component';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [ChildrenTopicComponent, AssociatedDebatesComponent, CommonModule],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.scss'
})
export class TopicComponent {

  @ViewChild("associatedDebates") associatedDebatesComponent?: AssociatedDebatesComponent;
  @ViewChild("childrenTopics") childrenTopicComponent?: ChildrenTopicComponent;

  topicId: string = 'topicId';
  topic: Topic = new Topic();

  constructor(
    private apiHandler: ApiHandlerService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.topicId = params['id'];
      this.getTopic();
      this.associatedDebatesComponent?.updateTopic(this.topicId)
      this.childrenTopicComponent?.updateTopic(this.topicId)
    });
  }

  getTopic() {
    this.apiHandler.getTopicById(this.topicId).
      subscribe({
        next: (response: any) => {
          this.topic = response;
        },
        error: (error: any) => {
        }
      });
  }

  get topicTitle() {
    if(this.topic) {
      return this.topic.title;
    }
    return '';
  }

}
