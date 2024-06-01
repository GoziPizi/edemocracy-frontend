import { Component } from '@angular/core';
import { HomeNewsComponent } from './home-news/home-news.component';
import { HomeTopicsComponent } from './home-topics/home-topics.component';
import { Topic } from '../../models/topics';
import { ApiHandlerService } from '../../services/api-handler.service';
import { TopicThumbnailComponent } from '../../thumbnails/topic-thumbnail/topic-thumbnail.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { ToasterService } from '../../services/toaster.service';
import { VisitorService } from '../../services/visitor.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeNewsComponent, HomeTopicsComponent, TopicThumbnailComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  
  topics: Topic[] = [];

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService,
    private toastService: ToasterService,
    private visitorService: VisitorService
    ) {
  }

  ngOnInit() {
    this.loadingService.increment();
    this.apiHandler.getTopics().subscribe({
      next: (response: any) => {
        this.loadingService.decrement();
        this.topics = response.slice(0, 10);
      },
      error: (error: any) => {
        this.loadingService.decrement();
        this.toastService.error('Erreur lors de la récupération des topics');
        console.error(error);
      }
    });
  }

  get isVisitor() {
    return this.visitorService.isVisitor;
  }
}
