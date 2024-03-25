import { Component } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationsDisplayerComponent } from './notifications-displayer/notifications-displayer.component';
import { SearchHeaderComponent } from './search-header/search-header.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationsDisplayerComponent, SearchHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    public apiHandler: ApiHandlerService
  ) {}

}
