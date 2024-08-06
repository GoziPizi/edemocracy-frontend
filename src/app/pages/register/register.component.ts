import { Component, ViewEncapsulation } from '@angular/core';
import { RegisterThumbnailComponent } from './register-thumbnail/register-thumbnail.component';
import { RouterModule } from '@angular/router';
import { ApiHandlerService } from '../../services/api-handler.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterThumbnailComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent { 

  constructor(
    private apiService: ApiHandlerService
  ) { }

  ngOnInit() {
    this.apiService.deleteToken();
  }

}