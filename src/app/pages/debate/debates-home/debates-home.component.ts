import { Component } from '@angular/core';
import { Debate } from '../../../models/debate';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { DebateThumbnailComponent } from '../../../thumbnails/debates/debate-thumbnail/debate-thumbnail.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-debates-home',
  standalone: true,
  imports: [CommonModule, DebateThumbnailComponent],
  templateUrl: './debates-home.component.html',
  styleUrl: './debates-home.component.scss'
})
export class DebatesHomeComponent {

  debates: Debate[] = []

  orderBy = 'time'
  page = 1

  constructor(
    private apiHandler: ApiHandlerService, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['orderBy']) {
        this.setOrder(params['orderBy'])
      }
      if (params['page']) {
        this.page = params['page']
      }
      this.fetchDebates()
    })
  }

  fetchDebates() {
    if (this.orderBy === 'time') {
      this.apiHandler.getDebatesByTime().subscribe(debates => {
        this.debates = debates
      })
    }
    else if (this.orderBy === 'popularity') {
      this.apiHandler.getDebatesByPopularity().subscribe(debates => {
        this.debates = debates
      })
    }
  }

  setOrder(orderBy: string) {
    this.orderBy = orderBy;
    this.fetchDebates();
  }

  goToNextPage() {
    this.router.navigate(['/debates'], { queryParams: { page: this.page + 1 } });
  }

  goToPreviousPage() {
    if(this.page === 1) return;
    this.router.navigate(['/debates'], { queryParams: { page: this.page - 1 } });
  }

}
