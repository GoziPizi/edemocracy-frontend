import { Component, Input } from '@angular/core';
import { MembershipStatus } from '../../../models/users';
import { CommonModule } from '@angular/common';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { LoadingService } from '../../../services/loading.service';
import { ToasterService } from '../../../services/toaster.service';
import { JackpotStatus, personalJackpot } from '../../../models/jackpot';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cotisation-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cotisation-component.component.html',
  styleUrl: './cotisation-component.component.scss'
})
export class CotisationComponentComponent {

  @Input() contributionStatus!: MembershipStatus;
  @Input() sponsorshipCode!: string | null;
  personalJackpot: personalJackpot | null = null;

  IBANPopUpOpened: boolean = false;
  newIBAN: string = '';

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.getPersonalJackpot();
  }

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

  generateSponsorshipCode() {
    this.loadingService.increment();
    this.apiHandler.generateSponsorshipCode().subscribe({
      next: (data: any) => {
        this.loadingService.decrement();
        this.toasterService.success('Code de parrainage généré');
        this.sponsorshipCode = data.code;
      },
      error: (error: any) => {
        this.toasterService.error('Impossible de générer un code de parrainage');
        this.loadingService.decrement();
      }
    })
  }

  createSponsorshipLink() {

    if(!this.sponsorshipCode) {
      this.toasterService.error('Impossible de créer un lien de parrainage');
      return;
    }

    navigator.clipboard.writeText(`https://digital-democracy.eu/register?sponsorshipCode=${this.sponsorshipCode}`).then(() => {
      this.toasterService.success('Lien copié dans le presse-papier');
    }).catch(err => {
      this.toasterService.error('Erreur lors de la copie du texte');
    });
  }

  getPersonalJackpot() {
    this.apiHandler.getPersonalJackpot().subscribe({
      next: (data: any) => {
        this.personalJackpot = data;
      },
      error: (error: any) => {
        this.personalJackpot = null;
      }
    })
  }

  openIBANPopUp() {
    this.IBANPopUpOpened = true;
  }

  closeIBANPopUp() {
    this.IBANPopUpOpened = false;
  }

  setJackpotIBAN() {
    //set the new IBAN
    //close the pop-up

    //if IBAN is updated, update the personalJackpot
    //if error, show error message and dont update the jackpot

    this.loadingService.increment();
    this.apiHandler.setJackpotIBAN(this.newIBAN).subscribe({
      next: (data: any) => {
        this.loadingService.decrement();
        this.personalJackpot = data;
        this.closeIBANPopUp();
      },
      error: (error: any) => {
        this.loadingService.decrement();
        this.toasterService.error('Impossible de mettre à jour votre IBAN');
      }
    })
  }

  withdrawPersonalJackpot() {
    //withdraw the personal jackpot
    //if success, update the personalJackpot to REQUESTED and show success message
    //if error, show error message and dont update the jackpot

    this.loadingService.increment();
    this.apiHandler.withdrawPersonalJackpot().subscribe({
      next: (data: any) => {
        this.loadingService.decrement();
        this.personalJackpot = data;
        this.toasterService.success('Votre demande de retrait a bien été prise en compte');
      },
      error: (error: any) => {
        this.loadingService.decrement();
        this.toasterService.error('Impossible de retirer votre cagnotte personnelle');
      }
    })
  }

  get isFreeUser(): boolean {
    if(this.contributionStatus as unknown as string === MembershipStatus[MembershipStatus.NONE] as unknown as string) {
      return true;
    }

    if(!this.contributionStatus) {
      return true;
    }
    return  false;
  }

  get isStandardUser(): boolean {
    return this.contributionStatus as unknown as string === MembershipStatus[MembershipStatus.STANDARD] as unknown as string;
  }

  get isPremiumUser(): boolean {
    return this.contributionStatus as unknown as string === MembershipStatus[MembershipStatus.PREMIUM] as unknown as string;
  }

  get waiting(): boolean {
    return this.personalJackpot?.status === JackpotStatus.PENDING;
  }

}
