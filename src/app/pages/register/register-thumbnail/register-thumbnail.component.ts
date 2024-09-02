import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-thumbnail',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './register-thumbnail.component.html',
  styleUrl: './register-thumbnail.component.scss'
})
export class RegisterThumbnailComponent {

  @Input() title: string = 'Titre';
  @Input() price: string = 'Prix';
  @Input() features: string[] = [];
  @Input() description: string = 'Description';
  @Input() redirect: string = 'redirect';

}
