import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { ApiHandlerService } from './services/api-handler.service';
import { HeaderComponent } from './utils/header/header.component';
import { FooterComponent } from './utils/footer/footer.component';
import { LoadingScreenComponent } from './utils/loading-screen/loading-screen.component';
import { ToasterComponent } from './utils/toaster/toaster.component';
import { DonationSiderComponent } from './utils/donation-sider/donation-sider.component';
import { DonationSiderService } from './services/donation-sider.service';
import { ReportingScreenComponent } from './utils/reporting-screen/reporting-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoadingScreenComponent,
    ToasterComponent,
    DonationSiderComponent,
    ReportingScreenComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Online Democracy';
  navigationChangeSubscription: any;

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router,
    private route: ActivatedRoute,
    private donationSiderService: DonationSiderService
  ) {}

  ngOnInit() {
    this.handleSponsorshipCode();
  }

  handleSponsorshipCode() {
    this.route.queryParams.subscribe((params) => {
      const sponsorshipCode = params['sponsorshipCode'];
      if (sponsorshipCode) {
        localStorage.setItem('sponsorshipCode', sponsorshipCode);
      }
    });
  }

  isFooterOrHeaderVisible(url: string) {
    if (
      url.includes('/connexion') ||
      url.includes('/register') ||
      url.includes('/landing') ||
      url.includes('/reset-password') ||
      url.includes('/register-from') ||
      url.includes('/donation-thanks')
    ) {
      return false;
    }
    return true;
  }

  isPageGoodForSider(url: string) {
    if (url.includes('/accueil') || url.includes('/presentation')) {
      return true;
    }
    return false;
  }

  get isHeaderVisible() {
    return this.isFooterOrHeaderVisible(this.router.url);
  }

  get isFooterVisible() {
    return this.isFooterOrHeaderVisible(this.router.url);
  }

  get isSiderDonationVisible() {
    return (
      this.isPageGoodForSider(this.router.url) &&
      this.donationSiderService.visible
    );
  }
}
