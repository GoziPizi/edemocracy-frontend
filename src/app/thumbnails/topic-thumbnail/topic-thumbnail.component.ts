import { Component, Input } from '@angular/core';
import { Topic } from '../../models/topics';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-topic-thumbnail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './topic-thumbnail.component.html',
  styleUrl: './topic-thumbnail.component.scss'
})
export class TopicThumbnailComponent {

  @Input() topic: Topic = new Topic();

  get title() {
    return this.topic ? this.topic.title : 'Titre du topic'
  }

  get description() {
    return this.topic ? this.topic.description : 'Description du topic'
  }

}
