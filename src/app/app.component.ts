import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ApiHandlerService } from './services/api-handler.service';
import { HeaderComponent } from './utils/header/header.component';
import { FooterComponent } from './utils/footer/footer.component';
import { LoadingScreenComponent } from './utils/loading-screen/loading-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, LoadingScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'E-democracy';
  isFooterVisible = true;
  navigationChangeSubscription: any;

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router
  ) {
    this.apiHandler.isLogged.subscribe((isLogged: boolean) => {
      if(!isLogged){
        this.router.navigate(['/landing']);
      }
    });
  }

  ngOnInit() {
    this.navigationChangeSubscription = this.router.events.subscribe(() => {
      this.isFooterVisible = this.router.url !== '/landing' && this.router.url !== '/connexion' && this.router.url !== '/inscription';
    });
  }


}
