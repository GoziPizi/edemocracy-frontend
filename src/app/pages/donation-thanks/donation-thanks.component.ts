import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { DonationSiderService } from '../../services/donation-sider.service';


@Component({
  selector: 'app-donation-thanks',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './donation-thanks.component.html',
  styleUrl: './donation-thanks.component.scss',
  animations: [
    trigger('fadeInUp', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('1s ease-out')
      ])
    ])
  ]
})
export class DonationThanksComponent {

  state = 'hidden';

  constructor(
    private DonationSiderService: DonationSiderService
  ) {
    this.DonationSiderService.setDonationDateToNow();
  }

  ngOnInit() {
    setTimeout(() => {
      this.state = 'visible';
    }, 0);
  }

}
