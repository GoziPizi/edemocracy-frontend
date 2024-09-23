import { Component } from '@angular/core';
import { adminViewPersonalJackpot, JackpotStatus } from '../../../models/jackpot';
import { SingleJackpotViewComponent } from './single-jackpot-view/single-jackpot-view.component';
import { CommonModule } from '@angular/common';
import { ApiHandlerService } from '../../../services/api-handler.service';

@Component({
  selector: 'app-sponsorship-dashboard',
  standalone: true,
  imports: [SingleJackpotViewComponent, CommonModule],
  templateUrl: './sponsorship-dashboard.component.html',
  styleUrl: './sponsorship-dashboard.component.scss'
})
export class SponsorshipDashboardComponent {

  jackpots: adminViewPersonalJackpot[] = [
    {
      userId: '1',
      jackpotAmount: 100,
      status: JackpotStatus.PENDING,
      IBAN: 'DE1234567890'
    },
    {
      userId: '2',
      jackpotAmount: 200,
      status: JackpotStatus.REQUESTED,
      IBAN: 'DE0987654321'
    },
    {
      userId: '3',
      jackpotAmount: 300,
      status: JackpotStatus.PENDING,
      IBAN: 'DE1234567890'
    },
    {
      userId: '4',
      jackpotAmount: 400,
      status: JackpotStatus.REQUESTED,
      IBAN: 'DE0987654321'
    },
    {
      userId: '5',
      jackpotAmount: 500,
      status: JackpotStatus.PENDING,
      IBAN: 'DE1234567890'
    },
    {
      userId: '6',
      jackpotAmount: 600,
      status: JackpotStatus.REQUESTED,
      IBAN: 'DE0987654321'
    },
    {
      userId: '7',
      jackpotAmount: 700,
      status: JackpotStatus.PENDING,
      IBAN: 'DE1234567890'
    },
    {
      userId: '8',
      jackpotAmount: 800,
      status: JackpotStatus.REQUESTED,
      IBAN: 'DE0987654321'
    },
    {
      userId: '9',
      jackpotAmount: 900,
      status: JackpotStatus.PENDING,
      IBAN: 'DE1234567890'
    },
    {
      userId: '10',
      jackpotAmount: 1000,
      status: JackpotStatus.REQUESTED,
      IBAN: 'DE0987654321'
    }
  ];

  constructor(
    private apiHandler: ApiHandlerService
  ) {

  }

  ngOnInit() {
    
  }

  fetchNonEmptyJackpots() {
    this.apiHandler.getNonEmptyJackpots().subscribe({
      next: (jackpots : adminViewPersonalJackpot[]) => {
        this.jackpots = jackpots;
      }
    });
  }

  get totalJackpot(): number {
    return this.jackpots.reduce((acc, jackpot) => acc + jackpot.jackpotAmount, 0);
  }

}
