import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { LoadingService } from '../../../services/loading.service';
import { Topic } from '../../../models/topics';
import { SmallTopicThumbnailComponent } from '../../../thumbnails/topic-thumbnail/small-topic-thumbnail/small-topic-thumbnail.component';
import { CommonModule } from '@angular/common';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-create-debate',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, SmallTopicThumbnailComponent, CommonModule],
  templateUrl: './create-debate.component.html',
  styleUrl: './create-debate.component.scss'
})
export class CreateDebateComponent {

  constructor(
    private route: ActivatedRoute,
    private apiHandler: ApiHandlerService,
    private router: Router,
    private loadingService: LoadingService,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        const topicId: string | null = params['topicId']
        if (topicId) {
          this.createDebateForm.patchValue({topicId: topicId})
        }
        const argumentId: string | null = params['argumentId']
        if (argumentId) {
          this.createDebateForm.patchValue({argumentId: argumentId})
        }
        this.fetchArgument()
      }
    })
  }

  createDebateForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    topicId: new FormControl(''),
    argumentId: new FormControl('')
  })

  argumentValue: string = ''

  fetchArgument() {
    if (!this.createDebateForm.value.argumentId) {
      return
    }
    this.loadingService.increment()
    this.apiHandler.getArgument(this.createDebateForm.value.argumentId).subscribe({
      next: (response: any) => {
        this.argumentValue = response.content
        this.createDebateForm.patchValue({description: 'Réponse concernant l\'argument: \"' +response.content + '\"'})
        this.loadingService.decrement()
      },
      error: (error) => {
        this.loadingService.decrement()
      }
    })
  }

  onSubmit() {
    this.loadingService.increment()
    this.apiHandler.postDebate(this.createDebateForm.value).subscribe({
      next: (response: any) => {
        this.loadingService.decrement()
        this.toasterService.success('Débat créé')
        this.router.navigate(['/debate', response.id])
      },
      error: (error) => {
        this.loadingService.decrement()
        this.toasterService.error('Erreur lors de la création du débat')
      }
    })
  }

}
