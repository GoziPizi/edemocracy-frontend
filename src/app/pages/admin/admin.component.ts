import { Component } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BanWord } from '../../models/banword';
import { User } from '../../models/users';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})

export class AdminComponent {

  banWords: BanWord[] = [];
  admins: User[] = [];

  newAdmin: string = '';
  newBanWord: string = '';

  constructor(
    private apiHandler: ApiHandlerService
  ) {

  }

  ngOnInit() {
    this.fetchBanWords();
    this.fetchAdmins();
  }

  fetchBanWords() {
    this.apiHandler.getBanWords().subscribe((response : any) => {
      this.banWords = response;
    });
  }

  fetchAdmins() {
    this.apiHandler.getAdmins().subscribe((response : any) => {
      this.admins = response;
      console.log(this.admins);
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

}
