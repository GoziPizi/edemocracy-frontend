import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TopicSearchItem } from '../../models/topics';
import { ApiHandlerService } from '../../services/api-handler.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-publish-topic',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './publish-topic.component.html',
  styleUrl: './publish-topic.component.scss'
})
export class PublishTopicComponent {

  topicOptions: TopicSearchItem[] = []

  topicCreationForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    parentId: new FormControl('', [Validators.required]),
  })

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.fetchTopics()
  }

  fetchTopics() {
    this.loadingService.increment()
    this.apiHandler.getTopicslist().subscribe({
      next: (response: any) => {
        this.topicOptions = response
        this.loadingService.decrement()
      },
      error: (error) => {
        console.error(error)
        this.loadingService.decrement()
      }
    })
  }

  onSubmit() {
    this.loadingService.increment()
    this.apiHandler.postTopic(this.topicCreationForm.value).subscribe({
      next: (response: any) => {
        console.log(response)
        //TODO: navigate to the post
        this.loadingService.decrement()
      },
      error: (error) => {
        console.error(error)
        this.loadingService.decrement()
      }
    })
  }
}
