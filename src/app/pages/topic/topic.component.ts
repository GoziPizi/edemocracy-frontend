import { Component, ViewChild } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { Topic } from '../../models/topics';
import { ActivatedRoute } from '@angular/router';
import { ChildrenTopicComponent } from '../../thumbnails/topic-thumbnail/children-topic/children-topic.component';
import { CommonModule } from '@angular/common';
import { AssociatedDebatesComponent } from './associated-debates/associated-debates.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [ChildrenTopicComponent, AssociatedDebatesComponent, CommonModule, YouTubePlayerModule],
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

  get mediaType() {
    let link = this.topic.medias[0] ? this.topic.medias[0] : '';
    if(!link) return 'none';
    if(link.includes('youtu')) return 'video';
    else return 'image';
  }

  extractVideoID(url: string) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[\?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(regex);
    
    if (match && match[1]) {
        return match[1];
    }

    return '';
  }

  get videoId() {
    let link = this.topic.medias[0] ? this.topic.medias[0] : '';
    if(!link) return '';
    if(link.includes('youtu')) return this.extractVideoID(link);
    else return ''; 
  }

  get image() {
    return this.topic.medias[0] ? this.topic.medias[0] : '/assets/topic-fixtures.png'
  }

}
