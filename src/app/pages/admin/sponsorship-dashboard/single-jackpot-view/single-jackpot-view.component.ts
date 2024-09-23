import { Component, Input } from '@angular/core';
import { adminViewPersonalJackpot } from '../../../../models/jackpot';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-jackpot-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-jackpot-view.component.html',
  styleUrl: './single-jackpot-view.component.scss'
})
export class SingleJackpotViewComponent {

  @Input() jackpot!: adminViewPersonalJackpot;

  get jackpotStatus(): string {
    return this.jackpot.status === 'PENDING' ? 'Demandé' : 'Non demandé';
  }

  get isPending(): boolean {
    return this.jackpot.status === 'PENDING';
  }

  confirmPayment(): void {
  }

}
