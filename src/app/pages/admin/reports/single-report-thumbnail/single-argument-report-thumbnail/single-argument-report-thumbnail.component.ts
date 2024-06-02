import { Component, Input } from '@angular/core';
import { ApiHandlerService } from '../../../../../services/api-handler.service';
import { Argument } from '../../../../../models/argument';

@Component({
  selector: 'app-single-argument-report-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './single-argument-report-thumbnail.component.html',
  styleUrl: './single-argument-report-thumbnail.component.scss'
})
export class SingleArgumentReportThumbnailComponent {

  @Input() argumentId!: string;
  argument: Argument | undefined;

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit() {
    this.fetchArgument();
  }

  fetchArgument() {
    this.apiHandler.getArgument(this.argumentId).subscribe({
      next: (argument:any) => this.argument = argument
    });
  }

}

