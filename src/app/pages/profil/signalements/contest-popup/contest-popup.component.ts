import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contest-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contest-popup.component.html',
  styleUrl: './contest-popup.component.scss'
})
export class ContestPopupComponent {

  @Output() closePopupEmitter = new EventEmitter();
  contestReason: string = '';

  closePopup() {
    this.closePopupEmitter.emit();
  }

  sendContest() {
    console.log(this.contestReason);
    this.closePopup();
  }

}
