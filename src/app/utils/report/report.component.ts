import { Component, Input } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { ToasterService } from '../../services/toaster.service';
import { VisitorService } from '../../services/visitor.service';
import { CommonModule } from '@angular/common';
import { ReportType } from '../../models/report';
import { ReportingService } from '../../services/reporting.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

  @Input() type!: ReportType;
  @Input() id!: string;
  @Input() size: string = 'large';

  constructor(
    private toaster: ToasterService,
    private visitorService: VisitorService,
    private reportingService: ReportingService
  ) { }

  report(event: any) {
    event.stopPropagation();
    this.reportingService.openReport(this.id, this.type)
  }

  get isVisitor(): boolean {
    return this.visitorService.isVisitor;
  }

}
