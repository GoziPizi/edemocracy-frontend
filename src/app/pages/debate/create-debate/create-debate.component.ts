import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-create-debate',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-debate.component.html',
  styleUrl: './create-debate.component.scss'
})
export class CreateDebateComponent {

  constructor(
    private route: ActivatedRoute,
    private apiHandler: ApiHandlerService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        const topicId: string | null = params['topicId']
        if (topicId) {
          this.createDebateForm.patchValue({topicId: topicId})
        }
      }
    })
  }

  createDebateForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    topicId: new FormControl('', Validators.required),
  })

  onSubmit() {
    this.loadingService.increment()
    this.apiHandler.postDebate(this.createDebateForm.value).subscribe({
      next: (response: any) => {
        this.loadingService.decrement()
        this.router.navigate(['/debate', response.id])
      },
      error: (error) => {
        this.loadingService.decrement()
      }
    })
  }

}
