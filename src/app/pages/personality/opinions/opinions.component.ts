import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-opinions',
  standalone: true,
  imports: [],
  templateUrl: './opinions.component.html',
  styleUrl: './opinions.component.scss'
})
export class OpinionsComponent {

  @Input() personalityId: string = '';

}
