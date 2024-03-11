import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiHandlerService } from '../../services/api-handler.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required] )
  });

  loginSubscription: any;

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router
  ) {
    this.loginSubscription = this.apiHandler.isLogged.subscribe((isLogged: boolean) => {
      if (isLogged) {
        this.router.navigate(['/accueil']);
      } else {
        console.log('Not logged in');
      }
    });
  }

  ngOnInit() {
  }

  login() {
    if(this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.apiHandler.login(this.loginForm.value.email, this.loginForm.value.password);
    }
  }

}
