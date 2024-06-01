import { Component, Input } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { ToasterService } from '../../services/toaster.service';
import { VisitorService } from '../../services/visitor.service';
import { CommonModule } from '@angular/common';
import { ReportType } from '../../models/report';

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
    private apiService: ApiHandlerService,
    private toaster: ToasterService,
    private visitorService: VisitorService
  ) { }

  report(event: any) {
    event.stopPropagation();
    this.apiService.report(this.id, this.type).subscribe({
      next: () => this.toaster.success('Signalement résussi'),
      error: () => this.toaster.error('Erreur lors du signalement')
    });
  }

  get isVisitor(): boolean {
    return this.visitorService.isVisitor;
  }

}
