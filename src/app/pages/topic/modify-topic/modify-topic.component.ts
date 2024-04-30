import { Component } from '@angular/core';
import { Topic } from '../../../models/topics';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../services/loading.service';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-modify-topic',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './modify-topic.component.html',
  styleUrl: './modify-topic.component.scss'
})
export class ModifyTopicComponent {

  topicId: string = 'topicId';
  topic: Topic = new Topic();

  topicModificationForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    parentTopicId: new FormControl(''),
  })

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private toastr: ToasterService
  ) {
    this.route.params.subscribe(params => {
      this.topicId = params['id'];
    });
  }

  ngOnInit() {
    this.fetchTopic();
  }

  fetchTopic() {
    this.apiHandler.getTopicById(this.topicId).subscribe((topic: any) => {
      this.topic = topic;
      this.updateForm();
    });
  }

  updateForm() {
    this.topicModificationForm.patchValue({
      title: this.topic.title,
      description: this.topic.description,
      parentTopicId: this.topic.parentTopicId,
    });
  
  }

  patchTopic() {
    this.loadingService.increment();
    this.apiHandler.patchTopic(this.topicId, this.topic).subscribe({
      next: () => {
        this.loadingService.decrement();
        this.toastr.success('Mise à jour du topic effectuée avec succès !');
        this.router.navigate(['/topic/' + this.topicId]);
      },
      error: () => {
        this.loadingService.decrement();
      }
    });
  }

}
