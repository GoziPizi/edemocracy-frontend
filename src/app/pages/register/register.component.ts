import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiHandlerService } from '../../services/api-handler.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { professions } from './professions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, NgSelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    profession: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required] ),
    passwordConfirmation: new FormControl('', [Validators.required] )
  });

  professions = professions;

  constructor(
    private apiHandler: ApiHandlerService
  ) {
  }

  register() {
    if(this.registerForm.valid && this.registerForm.value.email && this.registerForm.value.password) {
      this.apiHandler.register(this.registerForm)
    }
  }

}
