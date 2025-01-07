import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { LoadingService } from '../../../services/loading.service';
import { CommonModule } from '@angular/common';
import { ToasterService } from '../../../services/toaster.service';
import { TopicSelectorComponent } from "../../publish-topic/topic-selector/topic-selector.component";

@Component({
  selector: 'app-create-debate',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, TopicSelectorComponent],
  templateUrl: './create-debate.component.html',
  styleUrl: './create-debate.component.scss'
})
export class CreateDebateComponent {

  @ViewChild(TopicSelectorComponent) topicSelectorComponent!: TopicSelectorComponent;

  partyCreatorId: string | null = null;
  partyId: string | null = null;

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
        const partyCreatorId: string | null = params['partyCreatorId']
        if (partyCreatorId) {
          this.partyCreatorId = partyCreatorId
        }
        const partyId: string | null = params['partyId']
        if (partyId) {
          this.partyId = partyId
        }
        this.fetchArgument()
      }
    })
  }

  ngAfterViewInit() {
    if(this.createDebateForm.value.topicId) {
      this.topicSelectorComponent.forceSelectTopic(this.createDebateForm.value.topicId)
    }
  }

  createDebateForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    topicId: new FormControl(''),
    argumentId: new FormControl(''),
    partyCreatorId: new FormControl(''),
    partyId: new FormControl('')
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
        this.createDebateForm.patchValue({content: 'Réponse concernant l\'argument: \"' +response.content + '\"'})
        this.loadingService.decrement()
      },
      error: (error) => {
        this.loadingService.decrement()
      }
    })
  }

  onSubmit() {
    this.loadingService.increment()
    if(this.partyCreatorId) {
      this.createDebateForm.patchValue({partyCreatorId: this.partyCreatorId})
    }
    if(this.partyId) {
      this.createDebateForm.patchValue({partyId: this.partyId})
    }
    this.createDebateForm.patchValue({topicId: this.topicSelectorComponent.topicId})
    this.apiHandler.postDebate(this.createDebateForm.value).subscribe({
      next: (response: any) => {
        this.loadingService.decrement()
        this.toasterService.success('Débat créé')
        this.router.navigate(['/debate', response.id])
      },
      error: (error) => {
        if(error.error.errorName === 'ContentWithBanWordsException') {
          this.loadingService.decrement()
          this.toasterService.error('Le contenu contient des mots interdits')
          return;
        }
        this.loadingService.decrement()
        this.toasterService.error('Erreur lors de la création du débat')
      }
    })
  }

}
