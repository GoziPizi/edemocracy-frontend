import { Component, HostListener } from '@angular/core';
import { HomeNewsComponent } from './home-news/home-news.component';
import { HomeTopicsComponent } from './home-topics/home-topics.component';
import { Topic } from '../../models/topics';
import { ApiHandlerService } from '../../services/api-handler.service';
import { TopicThumbnailComponent } from '../../thumbnails/topic-thumbnail/topic-thumbnail.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { VisitorService } from '../../services/visitor.service';
import { Debate } from '../../models/debate';
import { DebateAccueilThumbnailComponent } from "./debate-accueil-thumbnail/debate-accueil-thumbnail.component";
import { FormsModule } from '@angular/forms';

export class MediaDebateThumbnail extends Debate {
  media: string = '';
}

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HomeNewsComponent, HomeTopicsComponent, DebateAccueilThumbnailComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  pageNumberLoaded: number = 0;
  isLoading: boolean = false;
  hasReachedEnd: boolean = false;
  private resizeListener = () => {
    this.isMobile = window.innerWidth <= 768;
  };

  isMobile: boolean = window.innerWidth <= 768;
  showFooter = false;
  lastScrollTop = 0;
  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }
  
  debates: MediaDebateThumbnail[] = [];
  debatesToLoad: MediaDebateThumbnail[] = [];

  showSearch = false;
  searchCategory: string = 'sujets';
  searchText: string = '';
  isLoggedIn: boolean = false;

  showSidebar = false;

  homeNews: { id: string; title: string }[] = [];
  homeTopics: { name: string }[] = [];

  constructor(
    private apiHandler: ApiHandlerService,
    private toastService: ToasterService,
    private visitorService: VisitorService,
    private router: Router,
    
  ) {}

  ngOnInit(): void {
    // ✅ Vérifie si l'utilisateur est connecté
    const token = localStorage.getItem('accessToken');
    this.isLoggedIn = !!token;
  
    // 🔄 Charge les sujets récents
    this.fetchNextPage();
  
    this.apiHandler.getRecentTopics().subscribe((topics: any[]) => {
      console.log('Sujets récents reçus :', topics);
      this.homeNews = topics.map(t => ({
        id: t.id,
        title: t.title
      }));
    });
  
    // 📚 Charge tous les sujets
    this.apiHandler.getTopics().subscribe((topics: any[]) => {
      this.homeTopics = topics;
    });
  
    // 📱 Détecte si on est sur mobile
    this.isMobile = window.innerWidth <= 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }
  launchSearch(): void {
    if (!this.searchText || !this.searchCategory) {
      console.warn('Champ vide');
      return;
    }
  
    console.log('Recherche :', this.searchCategory, this.searchText);
  
    this.router.navigate(['/recherche'], {
      queryParams: {
        type: this.searchCategory,
        q: this.searchText
      }
    });
  }
  
  
  goToProfilOrLogin(): void {
    // Idéalement, vérifie aussi que le token est encore valide
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user'); // facultatif si tu l'enregistres aussi
    if (token && user) {
      this.router.navigate(['/profil']);
    } else {
      this.router.navigate(['/landing']);
    }
  }
  
  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
      this.fetchNextPage();
    }

    const st = window.scrollY;
    if (st < this.lastScrollTop - 50) {
      this.showFooter = true;
    } else {
      this.showFooter = false;
    }
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  fetchNextPage() {
    if (this.isLoading || this.hasReachedEnd) return;

    this.isLoading = true;

    this.apiHandler.getTrendingDebatesThumbnails(this.pageNumberLoaded + 1).subscribe({
      next: (response: any) => {
        if (response.length === 0) {
          this.hasReachedEnd = true;
          this.isLoading = false;
          return;
        }

        this.debates = [];

        response.forEach((debate: any) => {
          console.log(debate); // <-- pour vérifier le champ dans la console navigateur
          if (!debate.media) {
            debate.media = 'assets/default-debate.jpg';
          }
          if (!debate.parentId) { // <--- ici on filtre pour n'ajouter que les débats parents
            this.debates.push(debate);
          }
        });        

        this.pageNumberLoaded++;
        this.isLoading = false;
      },
      error: () => {
        this.toastService.error('Erreur lors du chargement des débats');
        this.isLoading = false;
      }
    });
  }

  get isVisitor() {
    return this.visitorService.isVisitor;
  }

  get isAdmin() {
    const role = this.apiHandler.role;
    return role === 'ADMIN';
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  closeSidebar() {
    this.showSidebar = false;
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  goTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  goToTopic(id: string) {
    this.router.navigate([`/topic/${id}`]);
  }
}
