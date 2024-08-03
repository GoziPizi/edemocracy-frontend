import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { professions } from '../professions';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { PoliticSideDropdownItem } from '../../../models/politicSides';
import { PoliticSides } from '../../../enums/politicSides';
import { politicSideMapperEnumToUser } from '../../../mappers/politicside-mapper';
import { IdInputComponent } from './id-input/id-input.component';

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

  type: RegisterFormType = RegisterFormType.Free;

  registerForm = new FormGroup({
    //required fields
    firstName: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    politicSide: new FormControl('', [Validators.required]),
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

  professions = professions;
  politicSideOptions: PoliticSideDropdownItem[] = [];

  //formOptions
  manuallyAddProfession = false;

  constructor(
    private route: ActivatedRoute
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

  get inscriptionName() {
    if(this.type === RegisterFormType.Standard) {
      return 'Inscription standard';
    }
    if(this.type === RegisterFormType.Premium) {
      return 'Inscription premium';
    }
    return 'Inscription gratuite';
  }

  get notFree() {
    return this.type !== RegisterFormType.Free;
  }
}

