import { Component } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    public apiHandler: ApiHandlerService
  ) {}

}
