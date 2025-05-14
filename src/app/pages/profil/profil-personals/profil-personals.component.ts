import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { LoadingService } from '../../../services/loading.service';
import { User } from '../../../models/users';
import { ImageInputComponent } from '../../../utils/image-input/image-input.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { religions } from '../../register/register-form/religions';
import { origins } from '../../register/register-form/origins';
import { professions } from '../../register/professions';
import { ToasterService } from '../../../services/toaster.service';
import { DiplomaInputComponent } from '../../register/register-form/diploma-input/diploma-input.component';

@Component({
  selector: 'app-profil-personals',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ImageInputComponent,
    CommonModule,
    NgSelectModule,
    DiplomaInputComponent,
  ],
  templateUrl: './profil-personals.component.html',
  styleUrl: './profil-personals.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProfilPersonalsComponent {
  @ViewChild('imageInput') imageInput!: ImageInputComponent;
  @ViewChild('diplomaInput') diplomaInput!: DiplomaInputComponent;

  updateInformationsForm = new FormGroup({
    telephone: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(15),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    postalCode: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    city: new FormControl('', [Validators.required, Validators.minLength(2)]),
    profession: new FormControl('', [Validators.nullValidator]),
    yearsOfExperience: new FormControl<number | null>(null, [
      Validators.nullValidator,
    ]),
    origin1: new FormControl('', [Validators.nullValidator]),
    origin2: new FormControl('', [Validators.nullValidator]),
    origin3: new FormControl('', [Validators.nullValidator]),
    origin4: new FormControl('', [Validators.nullValidator]),
    religion: new FormControl('', [Validators.nullValidator]),
    actualSex: new FormControl('', [Validators.nullValidator]),
    sexualOrientation: new FormControl('', [Validators.nullValidator]),
  });

  religions = religions;
  origins = origins;
  professions = professions;

  user: User = new User();

  imageCorrectlyUploaded = false;

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this.fetchUser();
    this.fetchDiplomas();
  }

  fetchUser() {
    this.loadingService.increment();
    this.apiHandler.getUser()!.subscribe({
      next: (data: User) => {
        this.user = data;
        this.loadingService.decrement();
        this.prefillFormWithUser();
        if (this.user.profilePicture) {
          this.imageInput.setImage(this.user.profilePicture);
        }
      },
      error: () => {
        this.loadingService.decrement();
      },
    });
  }

  fetchDiplomas() {
    this.loadingService.increment();
    this.apiHandler.getUserDiplomas().subscribe({
      next: (data: any) => {
        console.log(data);
        this.loadingService.decrement();
        this.diplomaInput.setDiplomas(data);
      },
      error: () => {
        this.loadingService.decrement();
      },
    });
  }

  prefillFormWithUser() {
    this.updateInformationsForm.patchValue({
      telephone: this.user.telephone,
      address: this.user.address,
      postalCode: this.user.postalCode,
      city: this.user.city,
      profession: this.user.profession,
      yearsOfExperience: this.user.yearsOfExperience,
      origin1: this.user.origin1,
      origin2: this.user.origin2,
      origin3: this.user.origin3,
      origin4: this.user.origin4,
      religion: this.user.religion,
      actualSex: this.user.actualSex,
      sexualOrientation: this.user.sexualOrientation,
    });
  }

  onSubmit() {
    this.loadingService.increment();
    let formValue = {};
    if (this.updateInformationsForm.value.telephone) {
      formValue = {
        ...formValue,
        telephone: this.updateInformationsForm.value.telephone,
      };
    }
    if (this.updateInformationsForm.value.address) {
      formValue = {
        ...formValue,
        address: this.updateInformationsForm.value.address,
      };
    }
    if (this.updateInformationsForm.value.postalCode) {
      formValue = {
        ...formValue,
        postalCode: this.updateInformationsForm.value.postalCode,
      };
    }
    if (this.updateInformationsForm.value.city) {
      formValue = {
        ...formValue,
        city: this.updateInformationsForm.value.city,
      };
    }
    if (this.updateInformationsForm.value.profession) {
      formValue = {
        ...formValue,
        profession: this.updateInformationsForm.value.profession as string,
      };
    } else {
      formValue = { ...formValue, profession: null };
    }
    if (this.updateInformationsForm.value.yearsOfExperience) {
      formValue = {
        ...formValue,
        yearsOfExperience: this.updateInformationsForm.value
          .yearsOfExperience as number,
      };
    } else {
      formValue = { ...formValue, yearsOfExperience: null };
    }
    if (this.updateInformationsForm.value.origin1) {
      formValue = {
        ...formValue,
        origin1: this.updateInformationsForm.value.origin1 as string,
      };
    } else {
      formValue = { ...formValue, origin1: null };
    }
    if (this.updateInformationsForm.value.origin2) {
      formValue = {
        ...formValue,
        origin2: this.updateInformationsForm.value.origin2 as string,
      };
    } else {
      formValue = { ...formValue, origin2: null };
    }
    if (this.updateInformationsForm.value.origin3) {
      formValue = {
        ...formValue,
        origin3: this.updateInformationsForm.value.origin3 as string,
      };
    } else {
      formValue = { ...formValue, origin3: null };
    }
    if (this.updateInformationsForm.value.origin4) {
      formValue = {
        ...formValue,
        origin4: this.updateInformationsForm.value.origin4 as string,
      };
    } else {
      formValue = { ...formValue, origin4: null };
    }
    if (this.updateInformationsForm.value.religion) {
      formValue = {
        ...formValue,
        religion: this.updateInformationsForm.value.religion as string,
      };
    } else {
      formValue = { ...formValue, religion: null };
    }
    if (this.updateInformationsForm.value.actualSex) {
      formValue = {
        ...formValue,
        actualSex: this.updateInformationsForm.value.actualSex as string,
      };
    } else {
      formValue = { ...formValue, actualSex: null };
    }
    if (this.updateInformationsForm.value.sexualOrientation) {
      formValue = {
        ...formValue,
        sexualOrientation: this.updateInformationsForm.value
          .sexualOrientation as string,
      };
    } else {
      formValue = { ...formValue, sexualOrientation: null };
    }

    console.log(formValue);

    this.apiHandler.updateUser(formValue).subscribe({
      next: () => {
        this.loadingService.decrement();
        this.toaster.success('Vos informations ont bien été mises à jour');
      },
      error: () => {
        this.loadingService.decrement();
        this.toaster.error(
          'Une erreur est survenue lors de la mise à jour de vos informations'
        );
      },
    });
  }

  onSubmitImage() {
    if (this.imageInput.isThereAnImage()) {
      this.loadingService.increment();
      const image = this.imageInput.getImageFile();
      if (image) {
        this.apiHandler.updateUserImage(image).subscribe(() => {
          this.loadingService.decrement();
          this.imageCorrectlyUploaded = true;
          this.imageInput.removeImageFile();
        });
      }
      this.loadingService.decrement();
    }
  }

  onSubmitDiplomas() {
    const diplomas = this.diplomaInput.getDiplomas();
    this.apiHandler.updateUserDiplomas(diplomas).subscribe({
      next: () => {
        this.toaster.success('Vos diplômes ont bien été mis à jour');
      },
      error: () => {
        this.toaster.error(
          'Une erreur est survenue lors de la mise à jour de vos diplômes'
        );
      },
    });
  }
}
