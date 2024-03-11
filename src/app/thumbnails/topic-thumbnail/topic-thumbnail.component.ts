import { Component } from '@angular/core';
import { Topic } from '../../models/topics';

@Component({
  selector: 'app-topic-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './topic-thumbnail.component.html',
  styleUrl: './topic-thumbnail.component.scss'
})
export class TopicThumbnailComponent {

  topic: Topic = new Topic();

}
