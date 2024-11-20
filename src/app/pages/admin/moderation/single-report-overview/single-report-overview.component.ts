import { Component, Input } from '@angular/core';
import { report } from '../../../../models/moderation/reports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-report-overview',
  standalone: true,
  imports: [],
  templateUrl: './single-report-overview.component.html',
  styleUrl: './single-report-overview.component.scss'
})
export class SingleReportOverviewComponent {

  @Input() report!: report;

  constructor(
    private router: Router
  ) { }

  getTimeSinceUpdate(): string {
    const now = new Date();
    const updatedAt = new Date(this.report.updatedAt);
    const seconds = Math.floor((now.getTime() - updatedAt.getTime()) / 1000);

    const intervals = [
      { label: 'an', seconds: 31536000 },
      { label: 'mois', seconds: 2592000 },
      { label: 'jour', seconds: 86400 },
      { label: 'heure', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'seconde', seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count > 0) {
        return `il y a ${count} ${interval.label}${count > 1 ? 's' : ''}`;
      }

    }
    return 'à l\'instant';
  }

  goToDetails()  {
    this.router.navigate(['admin', 'moderation', 'reports', this.report.id]);
  }

}
