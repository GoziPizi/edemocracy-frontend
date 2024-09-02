import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ApiHandlerService } from './services/api-handler.service';
import { HeaderComponent } from './utils/header/header.component';
import { FooterComponent } from './utils/footer/footer.component';
import { LoadingScreenComponent } from './utils/loading-screen/loading-screen.component';
import { ToasterComponent } from './utils/toaster/toaster.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, LoadingScreenComponent, ToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'E-democracy';
  navigationChangeSubscription: any;

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router
  ) {

  }

  isFooterOrHeaderVisible(url: string) {
    if (
      url.includes('/connexion')
      || url.includes('/register')
      || url.includes('/landing')
      || url.includes('/reset-password')
      || url.includes('/register-from')
    ) {
      return false;
    }
    return true;
  }

  get isHeaderVisible() {
    return this.isFooterOrHeaderVisible(this.router.url);
  }

  get isFooterVisible() {
    return this.isFooterOrHeaderVisible(this.router.url);
  }

}
