import { Component } from '@angular/core';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { NotificationEdemoc } from '../../../models/notifications';
import { CommonModule } from '@angular/common';
import { SingleNotificationComponent } from './single-notification/single-notification.component';

@Component({
  selector: 'app-notifications-displayer',
  standalone: true,
  imports: [CommonModule, SingleNotificationComponent],
  templateUrl: './notifications-displayer.component.html',
  styleUrl: './notifications-displayer.component.scss'
})
export class NotificationsDisplayerComponent {

  notifications: NotificationEdemoc[] = [];

  constructor(
    private apiHandler: ApiHandlerService
  ) {}

  ngOnInit() {
    this.fetchNotifications();
  }

  deleteNotification(id: string) {
    this.apiHandler.deleteNotification(id).subscribe({
      next: () => {
        this.fetchNotifications();
      },
      error: (error) => {
      }
    });
  }

  fetchNotifications() {
    this.apiHandler.getNotifications().subscribe({
      next: (notifications: NotificationEdemoc[]) => {
        this.notifications = notifications;
      },
      error: (error) => {
      }
    });
    }

}
