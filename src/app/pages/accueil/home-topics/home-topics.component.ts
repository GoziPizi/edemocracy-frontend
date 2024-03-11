import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Topic } from '../../../models/topics';
import { ApiHandlerService } from '../../../services/api-handler.service';

@Component({
  selector: 'app-home-topics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-topics.component.html',
  styleUrl: './home-topics.component.scss'
})
export class HomeTopicsComponent {

  topics: Topic[] = [];

  constructor(
    private apiHandler: ApiHandlerService
    ) {
  }

  ngOnInit() {
    console.log('HomeNewsComponent');
    this.apiHandler.getTopics().subscribe((response: any) => {
      console.log(response);
      this.topics = response;
    });
  }

}
