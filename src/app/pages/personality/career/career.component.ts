import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss'
})
export class CareerComponent {

  @Input() personalityId: string = '';

}
