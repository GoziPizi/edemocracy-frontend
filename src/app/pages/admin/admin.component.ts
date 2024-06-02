import { Component } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BanWord } from '../../models/banword';
import { User } from '../../models/users';
import { ReportsComponent } from './reports/reports.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReportsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})

export class AdminComponent {

  banWords: BanWord[] = [];
  admins: User[] = [];
  verificationRequests: any[] = [];

  newAdmin: string = '';
  newBanWord: string = '';

  constructor(
    private apiHandler: ApiHandlerService
  ) {

  }

  ngOnInit() {
    this.fetchBanWords();
    this.fetchAdmins();
    this.fetchVerificationRequests();
  }

  fetchBanWords() {
    this.apiHandler.getBanWords().subscribe((response : any) => {
      this.banWords = response;
    });
  }

  fetchAdmins() {
    this.apiHandler.getAdmins().subscribe((response : any) => {
      this.admins = response;
    });
  }

  fetchVerificationRequests() {
    this.apiHandler.getVerificationRequests().subscribe((response : any) => {
      this.verificationRequests = response;
    });
  }

  addBanWord() {
    this.apiHandler.addBanWord(this.newBanWord).subscribe(() => {
      this.fetchBanWords();
      this.newBanWord = '';
    });
  }

  removeBanWord(id: string) {
    this.apiHandler.removeBanWord(id).subscribe(() => {
      this.fetchBanWords();
    });
  }

  removeAdmin(id: string) {
    this.apiHandler.removeAdmin(id).subscribe(() => {
      this.fetchAdmins();
    });
  }

  addAdmin() {
    this.apiHandler.setAdmin(this.newAdmin).subscribe(() => {
      this.newAdmin = '';
      this.fetchAdmins();
    });
  }

  acceptVerificationRequest(id: string) {
    this.apiHandler.verifyRequest(id, true).subscribe(() => {
      this.fetchVerificationRequests();
    });
  }

  rejectVerificationRequest(id: string) {
    this.apiHandler.verifyRequest(id, false).subscribe(() => {
      this.fetchVerificationRequests();
    });
  }

}
