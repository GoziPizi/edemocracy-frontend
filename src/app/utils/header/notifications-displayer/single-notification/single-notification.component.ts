import { Component, Input, Output } from '@angular/core';
import { NotificationEdemoc } from '../../../../models/notifications';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-single-notification',
  standalone: true,
  imports: [],
  templateUrl: './single-notification.component.html',
  styleUrl: './single-notification.component.scss'
})
export class SingleNotificationComponent {

  @Input() notification!: NotificationEdemoc;
  @Output() removeNotificationEvent = new EventEmitter<string>();

  constructor(
    private router: Router
  ) { }

  removeNotification(){
    this.removeNotificationEvent.emit(this.notification.id);
  }

  navigateTo(){
    let route: string;
    switch(this.notification.type){
      case 'Personality':
        route = 'personalites';
        break;
      case 'Party':
        route = 'partis';
        break;
      case 'Topic':
        route = 'topic';
        break;
      default:
        route = '/search';
    }
    this.router.navigate([route, this.notification.contentid])
  }

}
