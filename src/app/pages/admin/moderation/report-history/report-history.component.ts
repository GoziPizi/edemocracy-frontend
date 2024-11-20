import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-history',
  standalone: true,
  imports: [],
  templateUrl: './report-history.component.html',
  styleUrl: './report-history.component.scss'
})
export class ReportHistoryComponent {

  constructor(
    private Router: Router
  ) { }

  navigateToModeration() {
    this.Router.navigate(['admin', 'moderation'])
  }

  navigateToModeration2() {
    this.Router.navigate(['admin', 'moderation', 'moderation2'])
  }

}
