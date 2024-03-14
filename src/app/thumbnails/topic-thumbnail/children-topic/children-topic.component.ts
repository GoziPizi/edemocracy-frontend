import { Component, Input } from '@angular/core';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Topic } from '../../../models/topics';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-children-topic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './children-topic.component.html',
  styleUrl: './children-topic.component.scss'
})
export class ChildrenTopicComponent {

  @Input() childrenTopicId!: string;
  childrenTopic: Topic = new Topic();

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit() {
    this.getTopic();
  }

  getTopic() {
    this.apiHandler.getTopicById(this.childrenTopicId).
      subscribe({
        next: (response: any) => {
          this.childrenTopic = response;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  }

  get childrenTopicTitle() {
    if(this.childrenTopic) {
      return this.childrenTopic.title;
    }
    return '';
  }

}
