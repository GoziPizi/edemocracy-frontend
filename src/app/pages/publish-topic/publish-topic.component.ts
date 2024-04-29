import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TopicSearchItem } from '../../models/topics';
import { ApiHandlerService } from '../../services/api-handler.service';
import { LoadingService } from '../../services/loading.service';
import { Router } from '@angular/router';
import { ImageInputComponent } from '../../utils/image-input/image-input.component';
import { TopicSelectorComponent } from './topic-selector/topic-selector.component';

@Component({
  selector: 'app-publish-topic',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ImageInputComponent, TopicSelectorComponent],
  templateUrl: './publish-topic.component.html',
  styleUrl: './publish-topic.component.scss'
})
export class PublishTopicComponent {

  @ViewChild(ImageInputComponent) imageInput!: ImageInputComponent;
  @ViewChild(TopicSelectorComponent) topicSelector!: TopicSelectorComponent;

  topicOptions: TopicSearchItem[] = []

  topicCreationForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    parentTopicId: new FormControl(''),
  })

  mediaType = 'image'
  videoUrl = ''
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
    let image: File | undefined = undefined

    //Check for parent topic
    if(this.topicSelector.selectedTopic) {
      this.topicCreationForm.patchValue({parentTopicId: this.topicSelector.selectedTopic.id})
    }

    //Image check
    if(this.mediaType === 'image') {
      if(this.imageInput.isImageValid === false) {
        this.loadingService.decrement()
        return
      }
      image = this.imageInput.image
    }

    //API request
    this.apiHandler.postTopic(this.finalFormValue(), image).subscribe({
      next: (response: any) => {
        this.loadingService.decrement()
        this.router.navigate(['/topic', response.id])
      },
      error: (error) => {
        this.loadingService.decrement()
      }
    })
  }

  finalFormValue() {
    let formValue = this.topicCreationForm.value
    if(this.mediaType === 'video') {
      const returnV = {...formValue, medias: JSON.stringify([this.videoUrl])}
      return returnV
    }
    return formValue
  }

  //Return true if the form and the media are valid
  get isSubmitable(): boolean {
    let result = true

    if(this.topicCreationForm.invalid) {
      result = false
    }

    if(this.mediaType === 'image' && this.imageInput && this.imageInput.isImageValid === false) {
      result = false
    }

    if(this.mediaType === 'video'){
      //Check the link is a yt video
      let link = this.videoUrl
      if(link === undefined || link === '' || link === null) {
        result = false
      }
    }

    return result

  }
}
