import { Component } from '@angular/core';
import { Topic } from '../../../models/topics';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-news.component.html',
  styleUrl: './home-news.component.scss'
})
export class HomeNewsComponent {

  topics: Topic[] = [];

  constructor(
    private apiHandler: ApiHandlerService
    ) {
  }

  ngOnInit() {
    this.apiHandler.getTopics().subscribe((response: any) => {
      this.topics = response;
    });
  }

}
