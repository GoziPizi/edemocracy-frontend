import { Component, Input } from '@angular/core';
import { adminViewPersonalJackpot, JackpotStatus } from '../../../../models/jackpot';
import { CommonModule } from '@angular/common';
import { ApiHandlerService } from '../../../../services/api-handler.service';
import { LoadingService } from '../../../../services/loading.service';
import { ToasterService } from '../../../../services/toaster.service';

@Component({
  selector: 'app-single-jackpot-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-jackpot-view.component.html',
  styleUrl: './single-jackpot-view.component.scss'
})
export class SingleJackpotViewComponent {

  @Input() jackpot!: adminViewPersonalJackpot;

  constructor(
    private apiService: ApiHandlerService,
    private loading: LoadingService,
    private toast: ToasterService
  ) {

  }

  get jackpotStatus(): string {
    return this.jackpot.status === 'REQUESTED' ? 'Demandé' : 'Non demandé';
  }

  get isRequested(): boolean {
    return this.jackpot.status === 'REQUESTED';
  }

  confirmPayment(): void {
    this.loading.increment();
    this.apiService.confirmPaymentUsersJackpot(this.jackpot.userId).subscribe({
      next: () => {
        this.jackpot.status = JackpotStatus.PENDING
        this.toast.success('Paiement confirmé');
        this.loading.decrement();
      },
      error: (err) => {
        this.toast.error(err);
        this.loading.decrement();
      },
    });
  }

}
