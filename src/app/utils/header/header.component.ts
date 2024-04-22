import { Component } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationsDisplayerComponent } from './notifications-displayer/notifications-displayer.component';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { User } from '../../models/users';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationsDisplayerComponent, SearchHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  user: User = new User();

  constructor(
    public apiHandler: ApiHandlerService
  ) {}

  ngOnInit() {
    this.fetchUser();
  }

  fetchUser() {
    this.apiHandler.getUser().subscribe(user => {
      this.user = user;
    });
  }

  get profilePicture() {
    if(this.user.profilePicture && this.user.profilePicture !== "") {
      return this.user.profilePicture;
    }
    return "../../../assets/default-profil.webp";
  }

}
