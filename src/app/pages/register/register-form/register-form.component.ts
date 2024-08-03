import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { professions } from '../professions';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { PoliticSideDropdownItem } from '../../../models/politicSides';
import { PoliticSides } from '../../../enums/politicSides';
import { politicSideMapperEnumToUser } from '../../../mappers/politicside-mapper';
import { IdInputComponent } from './id-input/id-input.component';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { ToasterService } from '../../../services/toaster.service';

enum RegisterFormType {
  Free = 'free',
  Standard = 'standard',
  Premium = 'premium'
}

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, NgSelectModule, CommonModule, IdInputComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterFormComponent {

  @ViewChild('idInput') idInput?: IdInputComponent;

  type: RegisterFormType = RegisterFormType.Free;

  registerForm = new FormGroup({
    //required fields
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    politicSide: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(4)]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),

    //optional fields
    profession: new FormControl('', Validators.nullValidator),
    formationName: new FormControl('', Validators.nullValidator),
    formationDuration: new FormControl('', Validators.nullValidator),
    birthSex: new FormControl('', Validators.nullValidator),
    actualSex: new FormControl('', Validators.nullValidator),
    sexOrientation: new FormControl('', Validators.nullValidator),
    religion: new FormControl('', Validators.nullValidator),
  });

  optionalValidator(validator: ValidatorFn): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!control.value) {
        return null;
      }
      return validator(control);
    };
  }

  areInformationsCorrect = false;
  isCGUChecked = false;
  isCGPChecked = false; //for party

  professions = professions;
  politicSideOptions: PoliticSideDropdownItem[] = [];

  //formOptions
  manuallyAddProfession = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiHandlerService,
    private router: Router,
    private toastr: ToasterService
  ) {
    const politicSides = Object.values(PoliticSides);
    this.politicSideOptions = politicSides.map((side: PoliticSides) => {
      return {
        value: side,
        label: politicSideMapperEnumToUser(side)
      }
    });
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

  toggleManuallyAddProfession() {
    this.manuallyAddProfession = !this.manuallyAddProfession;
  }

  onSubmit() {
    if (this.type === RegisterFormType.Free) {
      this.freeSubmit();
    }
  }

  freeSubmit() {
    let data : any= {
      firstName: this.registerForm.value.firstName,
      name: this.registerForm.value.name,
      politicSide: this.registerForm.value.politicSide,
      address: this.registerForm.value.address,
      telephone: this.registerForm.value.telephone,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    if (this.registerForm.value.profession) {
      data = { ...data, profession: this.registerForm.value.profession };
    }

    if (this.registerForm.value.formationName) {
      data = { ...data, formationName: this.registerForm.value.formationName };
    }

    if (this.registerForm.value.formationDuration) {
      data = { ...data, formationDuration: this.registerForm.value.formationDuration };
    }

    if (this.registerForm.value.birthSex) {
      data = { ...data, birthSex: this.registerForm.value.birthSex };
    }

    if (this.registerForm.value.actualSex) {
      data = { ...data, actualSex: this.registerForm.value.actualSex };
    }

    if (this.registerForm.value.sexOrientation) {
      data = { ...data, sexOrientation: this.registerForm.value.sexOrientation };
    }

    if (this.registerForm.value.religion) {
      data = { ...data, religion: this.registerForm.value.religion };
    }

    this.api.registerFree(data).subscribe({
      next: (data: any) => {
        const token = data.key;
        this.api.setToken(token);
        this.router.navigate(['/accueil']);
      },
      error: (error: any) => {
        this.toastr.error('Erreur lors de l\'inscription');
      }
    });
  }

  toggleCGU() {
    this.isCGUChecked = !this.isCGUChecked;
  }

  toggleCGP() {
    this.isCGPChecked = !this.isCGPChecked;
  }

  toggleInformationsCorrect() {
    this.areInformationsCorrect = !this.areInformationsCorrect;
  }

  get inscriptionName() {
    if(this.type === RegisterFormType.Standard) {
      return 'Inscription standard';
    }
    if(this.type === RegisterFormType.Premium) {
      return 'Inscription premium';
    }
    return 'Inscription gratuite';
  }

  get isPremium() {
    return this.type === RegisterFormType.Premium;
  }

  get notFree() {
    return this.type !== RegisterFormType.Free;
  }

  get disabled() {
    if(!this.isCGUChecked) return true;
    if(!this.areInformationsCorrect) return true;
    if(this.type === RegisterFormType.Premium && !this.isCGPChecked) return true;
    if(!this.registerForm.value.name) return true;
    if(!this.registerForm.value.firstName) return true;
    if(!this.registerForm.value.politicSide) return true;
    if(!this.registerForm.value.address) return true;
    if(!this.registerForm.value.telephone) return true;
    if(!this.registerForm.value.email) return true;
    if(!this.registerForm.value.password) return true;
    if(!this.registerForm.value.passwordConfirm) return true;
    if(this.registerForm.value.password !== this.registerForm.value.passwordConfirm) return true;

    if(this.type !== RegisterFormType.Free) {
      if(!this.idInput?.isFilled) return true;
    }

    return false;
  }
}

