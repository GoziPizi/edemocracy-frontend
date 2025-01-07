import { Component, ElementRef, HostListener, ViewChildren } from '@angular/core';
import { HomeNewsComponent } from './home-news/home-news.component';
import { HomeTopicsComponent } from './home-topics/home-topics.component';
import { Topic } from '../../models/topics';
import { ApiHandlerService } from '../../services/api-handler.service';
import { TopicThumbnailComponent } from '../../thumbnails/topic-thumbnail/topic-thumbnail.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { VisitorService } from '../../services/visitor.service';
import { Debate } from '../../models/debate';
import { DebateAccueilThumbnailComponent } from "./debate-accueil-thumbnail/debate-accueil-thumbnail.component";

export class MediaDebateThumbnail extends Debate {
  media: string = '';
}

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeNewsComponent, HomeTopicsComponent, DebateAccueilThumbnailComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  
  pageNumberLoaded: number = 0;
  isLoading: boolean = false;
  hasReachedEnd: boolean = false;

  debates: MediaDebateThumbnail[] = [];
  debatesToLoad: MediaDebateThumbnail[] = [];

  constructor(
    private apiHandler: ApiHandlerService,
    private toastService: ToasterService,
    private visitorService: VisitorService
    ) {
  }

  ngOnInit() {
    this.fetchNextPage();
  }

  @HostListener ('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      // L'utilisateur a presque atteint le bas de la page
      this.fetchNextPage();
    }
  }

  fetchNextPage() {
    if (this.isLoading) {
      return;
    }
    if (this.hasReachedEnd) {
      return;
    }
    this.isLoading = true;

    this.apiHandler.getTrendingDebatesThumbnails(this.pageNumberLoaded + 1).subscribe({
      next: (response: any) => {
        if (response.length == 0) {
          this.hasReachedEnd = true;
          this.isLoading = false;
          return;
        }
        response.forEach((debate: any) => {
          if(debate.media == null) {
            debate.media = 'assets/default-debate.jpg';
          }
          this.debates.push(debate);
        });

        this.pageNumberLoaded++;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.error('Erreur lors du chargement des débats');
        this.isLoading = false;
      }
    });
  }

  get isVisitor() {
    return this.visitorService.isVisitor;
  }

  get isAdmin() {
    const role = this.apiHandler.role
    if(!role) return false;
    if(role !== 'ADMIN') return false;
    return true
  }
}
