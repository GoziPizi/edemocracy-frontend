import { Component } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  email: string = '';
  popup: boolean = false;

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router
  ) { }

  onSubmit() {
    this.apiHandler.resetPassword(this.email).subscribe(
      (response) => {
        this.popup = true;
      },
      (error) => {
      }
    );
  }

  onClose() {
    this.router.navigate(['/connexion']);
  }

}
