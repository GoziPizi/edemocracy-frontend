import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-for-against-debate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './for-against-debate.component.html',
  styleUrl: './for-against-debate.component.scss'
})
export class ForAgainstDebateComponent {

  width: number = 0.5;

  updateWidth(width: number) {
    this.width = width;
  }

  get pourcentageFor() {
    return Math.round(this.width * 100);
  }

  get pourcentageAgainst() {
    return Math.round((1 - this.width) * 100);
  }

  get stringWidth() {
    return `${this.width * 100}%`;
  }

  get oppositeStringWidth() {
    return `${(1 - this.width) * 100}%`;
  }

}
