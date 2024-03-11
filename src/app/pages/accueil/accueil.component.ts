import { Component } from '@angular/core';
import { HomeNewsComponent } from './home-news/home-news.component';
import { HomeTopicsComponent } from './home-topics/home-topics.component';
import { Topic } from '../../models/topics';
import { ApiHandlerService } from '../../services/api-handler.service';
import { TopicThumbnailComponent } from '../../thumbnails/topic-thumbnail/topic-thumbnail.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [HomeNewsComponent, HomeTopicsComponent, TopicThumbnailComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  
  topics: Topic[] = [];

  constructor(
    private apiHandler: ApiHandlerService
    ) {
  }

  ngOnInit() {
    console.log('HomeNewsComponent');
    this.apiHandler.getTopics().subscribe((response: any) => {
      console.log(response);
      this.topics = response;
    });
  }
}
