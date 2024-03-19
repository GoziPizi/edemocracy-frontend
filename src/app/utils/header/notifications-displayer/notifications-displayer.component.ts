import { Component } from '@angular/core';
import { ApiHandlerService } from '../../../services/api-handler.service';

@Component({
  selector: 'app-notifications-displayer',
  standalone: true,
  imports: [],
  templateUrl: './notifications-displayer.component.html',
  styleUrl: './notifications-displayer.component.scss'
})
export class NotificationsDisplayerComponent {

  notifications: any[] = [];

  constructor(
    private apiHandler: ApiHandlerService
  ) {}

  ngOnInit() {
    this.fetchNotifications();
  }

  fetchNotifications() {

  }

}
