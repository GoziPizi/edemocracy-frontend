import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiHandlerService } from '../../services/api-handler.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  changePasswordForm = new FormGroup({
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
    email: new FormControl(''),
    token: new FormControl('')
  });

  constructor(
    private apiHandler: ApiHandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.changePasswordForm.patchValue({
        email: params['email'],
        token: params['token']
      });
      console.log(this.changePasswordForm.value)
    });
  }

  onSubmit() {
    const email = this.changePasswordForm.get('email')?.value;
    const token = this.changePasswordForm.get('token')?.value;
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    if (email && token && newPassword) {
      this.apiHandler.changePassword(email, token, newPassword).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.log(error);
          }
        
        }
      );
    }
  }

  get identicalPasswords() {
    return this.changePasswordForm.get('newPassword')?.value === this.changePasswordForm.get('confirmPassword')?.value;
  }

  get isPasswordLengthValid() {
    const password = this.changePasswordForm.get('newPassword')?.value;
    return password && password.length >= 8;
  }

}
