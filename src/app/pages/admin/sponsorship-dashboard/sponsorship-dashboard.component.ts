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

  jackpots: adminViewPersonalJackpot[] = [];

  constructor(
    private apiHandler: ApiHandlerService
  ) {

  }

  ngOnInit() {
    this.fetchNonEmptyJackpots();
  }

  fetchNonEmptyJackpots() {
    this.apiHandler.getNonEmptyJackpots().subscribe({
      next: (jackpots : adminViewPersonalJackpot[]) => {
        this.jackpots = jackpots;
      }
    });
  }

  get totalJackpot(): number {
    return this.jackpots.reduce((acc, jackpot) => acc + jackpot.amount, 0);
  }

}
