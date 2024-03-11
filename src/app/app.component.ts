import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ApiHandlerService } from './services/api-handler.service';
import { HeaderComponent } from './utils/header/header.component';
import { FooterComponent } from './utils/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'nom-du-projet';

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router
  ) {
    this.apiHandler.isLogged.subscribe((isLogged: boolean) => {
      if(!isLogged){
        this.router.navigate(['/connexion']);
      }
    });
  }


}
