import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent {

  text: string = 'Toaster';
  isDisplayed: boolean = false;

  timeout: any;
  toasterSubscription: any;

  constructor(
    private toasterService: ToasterService
  ) {
    this.toasterSubscription = this.toasterService.messageSubject.subscribe((message: string) => {
      this.show(message);
    });
  }

  show(text: string) {
    this.text = text;
    this.isDisplayed = true;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.isDisplayed = false;
    }, 3000);
  }

}
