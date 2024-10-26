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
  isPonctual: boolean = false;
  isMonthly: boolean = true;
  isYearly: boolean = false;

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
    const interval = this.isMonthly ? 'month' : this.isYearly ? 'year' : null;
    this.apiHandler.getDonationLink(this.email, amount, interval).subscribe({
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
    const interval = this.isMonthly ? 'month' : this.isYearly ? 'year' : null;
    this.apiHandler.getDonationLink(this.email, this.amount, interval).subscribe({
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

  onPonctual() {
    this.isPonctual = true;
    this.isMonthly = false;
    this.isYearly = false;
  }

  onMonthly() {
    this.isPonctual = false;
    this.isMonthly = true;
    this.isYearly = false;
  }

  onYearly() {
    this.isPonctual = false;
    this.isMonthly = false;
    this.isYearly = true;
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
