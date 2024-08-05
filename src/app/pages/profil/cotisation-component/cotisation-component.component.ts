import { Component, Input } from '@angular/core';
import { MembershipStatus } from '../../../models/users';
import { CommonModule } from '@angular/common';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { LoadingService } from '../../../services/loading.service';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-cotisation-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cotisation-component.component.html',
  styleUrl: './cotisation-component.component.scss'
})
export class CotisationComponentComponent {

  @Input() contributionStatus!: MembershipStatus;

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService,
    private toasterService: ToasterService
  ) { }

  becomeStandard() {
    this.loadingService.increment();
    this.apiHandler.becomeStandard().subscribe({
      next: (data: any) => {
        this.loadingService.decrement();
        window.location.href = data.url;
      },
      error: (error: any) => {
        this.toasterService.error('Impossible de devenir membre standard');
        this.loadingService.decrement();
      }
    })
  }

  becomePremium() {
    this.loadingService.increment();
    this.apiHandler.becomePremium().subscribe({
      next: (data: any) => {
        this.loadingService.decrement();
        window.location.href = data.url;
      },
      error: (error: any) => {
        this.toasterService.error('Impossible de devenir membre premium');
        this.loadingService.decrement();
      }
    })
  }

  get isFreeUser(): boolean {
    return this.contributionStatus as unknown as string === MembershipStatus[MembershipStatus.NONE] as unknown as string;
  }

  get isStandardUser(): boolean {
    return this.contributionStatus as unknown as string === MembershipStatus[MembershipStatus.STANDARD] as unknown as string;
  }

  get isPremiumUser(): boolean {
    return this.contributionStatus as unknown as string === MembershipStatus[MembershipStatus.PREMIUM] as unknown as string;
  }

}
