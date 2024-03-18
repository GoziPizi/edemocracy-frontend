import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Topic } from '../../../models/topics';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-topics',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
    this.apiHandler.getTopics().subscribe((response: any) => {
      this.topics = response;
    });
  }

}
