import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TopicSearchItem } from '../../models/topics';
import { ApiHandlerService } from '../../services/api-handler.service';
import { LoadingService } from '../../services/loading.service';
import { Router } from '@angular/router';
import { ImageInputComponent } from '../../utils/image-input/image-input.component';

@Component({
  selector: 'app-publish-topic',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ImageInputComponent],
  templateUrl: './publish-topic.component.html',
  styleUrl: './publish-topic.component.scss'
})
export class PublishTopicComponent {

  @ViewChild(ImageInputComponent) imageInput!: ImageInputComponent;

  topicOptions: TopicSearchItem[] = []

  topicCreationForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    parentTopicId: new FormControl('', [Validators.required]),
  })

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService,
    private router: Router
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
        this.loadingService.decrement()
      }
    })
  }

  onSubmit() {
    this.loadingService.increment()
    const image: File | undefined = this.imageInput.getImageFile() || undefined;
    if(this.imageInput.isGoodRatio === false) {
      this.loadingService.decrement()
      return
    }
    this.apiHandler.postTopic(this.topicCreationForm.value, image).subscribe({
      next: (response: any) => {
        this.loadingService.decrement()
        this.router.navigate(['/topic', response.id])
      },
      error: (error) => {
        this.loadingService.decrement()
      }
    })
  }
}
