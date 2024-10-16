import { Component } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { LoadingService } from '../../services/loading.service';
import { DonationSiderService } from '../../services/donation-sider.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donation-sider',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './donation-sider.component.html',
  styleUrl: './donation-sider.component.scss'
})
export class DonationSiderComponent {

  email: string = '';

  customAmount: boolean = false;
  amount: number = 10;
  isRecurring: boolean = false;

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService,
    private donationSiderService: DonationSiderService
  ) { }

  onClose() {
    this.donationSiderService.closeSider();
  }

  onQuickDonate(amount: number) {
    this.loadingService.increment();
    this.apiHandler.getDonationLink(this.email, amount, this.isRecurring).subscribe({
      next: (response: any) => {
        this.loadingService.decrement();
        window.location.href = response.url;
      },
      error: (error) => {
        this.loadingService.decrement();
        console.error(error);
      }
    });
  }

  onDonate() {
    this.loadingService.increment();
    this.apiHandler.getDonationLink(this.email, this.amount, this.isRecurring).subscribe({
      next: (response: any) => {
        this.loadingService.decrement();
        window.location.href = response.url;
      },
      error: (error) => {
        this.loadingService.decrement();
        console.error(error);
      }
    });
  }

  get isEmailValid() {
    return this.email.includes('@') && this.email.includes('.');
  }

  get isEmailCorrect() {
    if (this.email === '') {
      return true;
    }
    return this.isEmailValid;
  }

  get isAmountValid() {
    return this.amount > 0;
  }
}
