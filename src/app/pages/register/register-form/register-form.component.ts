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
import { LoadingService } from '../../../services/loading.service';
import { DiplomaInputComponent } from './diploma-input/diploma-input.component';
import { religions } from './religions';

enum RegisterFormType {
  Free = 'free',
  Standard = 'standard',
  Premium = 'premium'
}

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, NgSelectModule, CommonModule, IdInputComponent, DiplomaInputComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterFormComponent {

  @ViewChild('idInput') idInput?: IdInputComponent;
  @ViewChild('diplomaInput') diplomaInput!: DiplomaInputComponent

  type: RegisterFormType = RegisterFormType.Free;

  registerForm = new FormGroup({
    //required fields
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    politicSide: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(4)]),
    postalCode: new FormControl('', [Validators.required, Validators.minLength(2)]),
    city: new FormControl('', [Validators.required, Validators.minLength(2)]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),

    //optional fields
    profession: new FormControl('', Validators.nullValidator),
    yearsOfExperience: new FormControl('', Validators.nullValidator),
    birthSex: new FormControl('', Validators.nullValidator),
    actualSex: new FormControl('', Validators.nullValidator),
    sexualOrientation: new FormControl('', Validators.nullValidator),
    religion: new FormControl('', Validators.nullValidator),
    sponsorshipCode: new FormControl('', Validators.nullValidator),
  });

  optionalValidator(validator: ValidatorFn): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!control.value) {
        return null;
      }
      return validator(control);
    };
  }

  religions = religions;

  areInformationsCorrect = false;
  isCGUChecked = false;
  isAgeChecked = false;
  isCGPChecked = false; //for party

  professions = professions;
  politicSideOptions: PoliticSideDropdownItem[] = [];

  //formOptions
  manuallyAddProfession = false;

  //sponsorshipCode
  isCodeVerified = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiHandlerService,
    private router: Router,
    private toastr: ToasterService,
    private loading: LoadingService
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

      let sponsorshipCode = params.get('sponsorshipCode');
      if (sponsorshipCode) {
        this.registerForm.patchValue({ sponsorshipCode });
        //set sponsorshipCode value touched
        this.registerForm.get('sponsorshipCode')?.markAsTouched();
        this.checkSponsorshipCode();
      }
    });
  }

  toggleManuallyAddProfession() {
    this.manuallyAddProfession = !this.manuallyAddProfession;
  }

  onSubmit() {
    if (this.type === RegisterFormType.Free) {
      this.freeSubmit();
    } else {
      this.paidSubmit();
    }
  }

  checkSponsorshipCode() {
    if(this.registerForm.value.sponsorshipCode) {
      this.api.checkSponsorshipCode(this.registerForm.value.sponsorshipCode).subscribe({
        next: (data: any) => {
          this.isCodeVerified = true;
        },
        error: (error: any) => {
          this.isCodeVerified = false;
          this.toastr.error('Code de parrainage invalide');
        }
      });
    }
  }


  freeSubmit() {

    this.loading.increment();

    let data : any= {
      firstName: this.registerForm.value.firstName,
      name: this.registerForm.value.name,
      politicSide: this.registerForm.value.politicSide,
      address: this.registerForm.value.address,
      postalCode: this.registerForm.value.postalCode,
      city: this.registerForm.value.city,
      telephone: this.registerForm.value.telephone,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    if (this.registerForm.value.profession) {
      data = { ...data, profession: this.registerForm.value.profession };
    }

    if (this.registerForm.value.birthSex) {
      data = { ...data, birthSex: this.registerForm.value.birthSex };
    }

    if (this.registerForm.value.actualSex) {
      data = { ...data, actualSex: this.registerForm.value.actualSex };
    }

    if (this.registerForm.value.sexualOrientation) {
      data = { ...data, sexualOrientation: this.registerForm.value.sexualOrientation };
    }

    if (this.registerForm.value.religion) {
      data = { ...data, religion: this.registerForm.value.religion };
    }

    if (this.registerForm.value.sponsorshipCode) {
      data = { ...data, sponsorshipCode: this.registerForm.value.sponsorshipCode };
    }

    const diplomas = JSON.stringify(this.diplomaInput.getDiplomas())
  
    data = { ...data, diplomas}

    this.api.registerFree(data).subscribe({
      next: (data: any) => {
        this.loading.decrement();
        const token = data.key;
        this.api.setToken(token);
        this.router.navigate(['/accueil']);
      },
      error: (error: any) => {
        this.loading.decrement();
        this.toastr.error('Erreur lors de l\'inscription');
      }
    });
  }

  paidSubmit() {

    this.loading.increment();

    let formData = new FormData();

    formData.append('firstName', this.registerForm.value.firstName as string);
    formData.append('name', this.registerForm.value.name as string);
    formData.append('politicSide', this.registerForm.value.politicSide as string);
    formData.append('address', this.registerForm.value.address as string);
    formData.append('postalCode', this.registerForm.value.postalCode as string);
    formData.append('city', this.registerForm.value.city as string);
    formData.append('telephone', this.registerForm.value.telephone as string);
    formData.append('email', this.registerForm.value.email as string);
    formData.append('password', this.registerForm.value.password as string);

    if(this.registerForm.value.profession) {
      formData.append('profession', this.registerForm.value.profession as string);
    }
    if(this.registerForm.value.yearsOfExperience) {
      formData.append('yearsOfExperience', this.registerForm.value.yearsOfExperience as string);
    }
    if(this.registerForm.value.birthSex) {
      formData.append('birthSex', this.registerForm.value.birthSex as string);
    }
    if(this.registerForm.value.actualSex) {
      formData.append('actualSex', this.registerForm.value.actualSex as string);
    }
    if(this.registerForm.value.sexualOrientation) {
      formData.append('sexualOrientation', this.registerForm.value.sexualOrientation as string);
    }
    if(this.registerForm.value.religion) {
      formData.append('religion', this.registerForm.value.religion as string);
    }

    if(this.registerForm.value.sponsorshipCode) {
      formData.append('sponsorshipCode', this.registerForm.value.sponsorshipCode as string);
    }

    formData.append('recto1', this.idInput?.firstRecto.getImageFile() as File);
    formData.append('verso1', this.idInput?.firstVerso.getImageFile() as File);
    formData.append('idNumber1', this.idInput?.firstIdNumber as string);
    formData.append('idNationality1', this.idInput?.firstNationalityId.toString() as string);

    if(this.idInput?.isSecondId) {
      formData.append('recto2', this.idInput?.secondRecto?.getImageFile() as File);
      formData.append('verso2', this.idInput?.secondVerso?.getImageFile() as File);
      formData.append('idNumber2', this.idInput?.secondIdNumber as string);
      formData.append('idNationality2', this.idInput?.secondNationalityId.toString() as string);
    }

    if(this.idInput?.isThirdId) {
      formData.append('recto3', this.idInput?.thirdRecto?.getImageFile() as File);
      formData.append('verso3', this.idInput?.thirdVerso?.getImageFile() as File);
      formData.append('idNumber3', this.idInput?.thirdIdNumber as string);
      formData.append('idNationality3', this.idInput?.thirdNationalityId.toString() as string);
    }

    const diplomas : {name: string ; obtention: number}[] = this.diplomaInput.getDiplomas()
    
    formData.append('diplomas', JSON.stringify(diplomas))

    if(this.type === RegisterFormType.Standard) {
      this.api.registerStandard(formData).subscribe({
        next: (data: any) => {
          this.loading.decrement();
          const {checkoutUrl} = data;
          window.location.href = checkoutUrl;
        },
        error: (error: any) => {
          this.loading.decrement();
          this.toastr.error('Erreur lors de l\'inscription');
        }
      });
    }

    if(this.type === RegisterFormType.Premium) {
      this.api.registerPremium(formData).subscribe({
        next: (data: any) => {
          this.loading.decrement();
          const {checkoutUrl} = data;
          window.location.href = checkoutUrl;
        },
        error: (error: any) => {
          this.loading.decrement();
          this.toastr.error('Erreur lors de l\'inscription');
        }
      });
    }
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

  toggleAge() {
    this.isAgeChecked = !this.isAgeChecked;
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
    if(!this.isAgeChecked) return true;
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

