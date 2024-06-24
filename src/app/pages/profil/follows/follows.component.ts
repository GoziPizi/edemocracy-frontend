import { Component } from '@angular/core';
import { following } from '../../../models/following';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { LoadingService } from '../../../services/loading.service';
import { CommonModule } from '@angular/common';
import { SingleFollowDisplayComponent } from './single-follow-display/single-follow-display.component';

@Component({
  selector: 'app-follows',
  standalone: true,
  imports: [CommonModule, SingleFollowDisplayComponent],
  templateUrl: './follows.component.html',
  styleUrl: './follows.component.scss'
})
export class FollowsComponent {

  follows: following[] = [];

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(){
    this.fetchFollows();
  }

  fetchFollows() {
    this.apiHandler.getAllFollows().subscribe({
      next: (data: any) => {
        this.follows = data;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}
