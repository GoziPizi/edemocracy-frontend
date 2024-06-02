import { Component, Input } from '@angular/core';
import { DebateDescriptionReformulation } from '../../../../../models/debate';
import { ApiHandlerService } from '../../../../../services/api-handler.service';

@Component({
  selector: 'app-single-reformulation-report-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './single-reformulation-report-thumbnail.component.html',
  styleUrl: './single-reformulation-report-thumbnail.component.scss'
})
export class SingleReformulationReportThumbnailComponent {

  @Input() reformulationId!: string;
  reformulation: DebateDescriptionReformulation | undefined;

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit() {
    this.fetchReformulation();
  }

  fetchReformulation() {
    this.apiHandler.getDebateReformulation(this.reformulationId).subscribe({
      next: (reformulation:any) => this.reformulation = reformulation
    });
  }

}
