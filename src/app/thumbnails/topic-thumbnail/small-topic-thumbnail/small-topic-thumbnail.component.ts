import { Component, Input } from '@angular/core';
import { Topic } from '../../../models/topics';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-small-topic-thumbnail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './small-topic-thumbnail.component.html',
  styleUrl: './small-topic-thumbnail.component.scss'
})
export class SmallTopicThumbnailComponent {

  @Input() topicId!: string;
  topic: Topic = new Topic();

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit() {
    this.getTopic();
  }

  getTopic() {
    this.apiHandler.getTopicById(this.topicId).subscribe({
      next: (response: any) => {
        this.topic = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  get topicTitle() {
    return this.topic.title || '';
  }
}
