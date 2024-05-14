import { Component, Input } from '@angular/core';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Argument } from '../../../models/argument';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-argument-debate-presentation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './argument-debate-presentation.component.html',
  styleUrl: './argument-debate-presentation.component.scss'
})
export class ArgumentDebatePresentationComponent {

  @Input() argumentId: string | undefined;
  argument: Argument = new Argument();

  constructor(
    private apiHandler: ApiHandlerService, 
    private router: Router
  ) {
    this.fetchArgument();
  }

  fetchArgument() {
    if(!this.argumentId) return;
    this.apiHandler.getArgument(this.argumentId).subscribe({
      next: (response: any) => {
        this.argument = response;
      }
    })
  }

  setArgumentId(argumentId: string | undefined) {
    this.argumentId = argumentId;
    this.fetchArgument();
  }

  onSeeDebate() {
    this.router.navigate(['/debate', this.argument.debateId], {
      queryParamsHandling: 'merge'
    })

  }

}
