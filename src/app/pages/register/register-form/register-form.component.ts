import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

enum RegisterFormType {
  Free = 'free',
  Standard = 'standard',
  Premium = 'premium'
}

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  type: RegisterFormType = RegisterFormType.Free;

  registerForm = new FormGroup({
    //required fields
    firstName: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),

    //optional fields
    profession: new FormControl(''),
    formationName: new FormControl(''),
    formationDuration: new FormControl(''),
    birthSex: new FormControl(''),
    actualSex: new FormControl(''),
    sexOrientation: new FormControl(''),
    religion: new FormControl(''),
  });

  areInformationsCorrect = false;
  isCGUChecked = false;
  isCGPChecked = false; //for party

  constructor(
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      let routeType = params.get('type');
      if (routeType === null) {
        routeType = RegisterFormType.Free;
      }
      if (routeType === 'free' || routeType === 'standard' || routeType === 'premium') {
        this.type = routeType as any;
      } else {
        this.type = RegisterFormType.Free;
      }
    });
  }
}

