import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiHandlerService } from '../../services/api-handler.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { professions } from './professions';
import { ImageInputComponent } from '../../utils/image-input/image-input.component';
import { PoliticSides } from '../../enums/politicSides';
import { PoliticSideDropdownItem } from '../../models/politicSides';
import { politicSideMapperEnumToUser } from '../../mappers/politicside-mapper';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, NgSelectModule, ImageInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {

  @ViewChild('rectoInput') rectoInput!: ImageInputComponent;
  @ViewChild('versoInput') versoInput!: ImageInputComponent;

  politicSideOptions: PoliticSideDropdownItem[] = [];

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]),
    profession: new FormControl('', [Validators.required]),
    politicSide: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required] ),
    passwordConfirmation: new FormControl('', [Validators.required] )
  });

  professions = professions;

  mapperEnumToString = politicSideMapperEnumToUser;

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router, 
    private loadingService: LoadingService
  ) {
    const politicSides = Object.values(PoliticSides);
    this.politicSideOptions = politicSides.map((side: PoliticSides) => {
      return {
        value: side,
        label: politicSideMapperEnumToUser(side)
      }
    });
  }

  register() {
    this.loadingService.increment();
    if(this.registerForm.valid && this.rectoInput.isThereAnImage() && this.versoInput.isThereAnImage()) {
      let formData = new FormData();

      const formValues = this.registerForm.value;

      for (const key in formValues) {
        if (formValues.hasOwnProperty(key)) {
          // Use type assertion to tell TypeScript that key is a key of formValues
          const value = formValues[key as keyof typeof formValues];
          if (value !== null) { // Check to ensure value is not null before appending
            formData.append(key, value as string);
          }
        }
      }

      formData.append('language', 'fr');
      formData.append('address', 'FR');

      formData.delete('passwordConfirmation');

      const rectoFile: File | undefined = this.rectoInput.getImageFile() || undefined;
      const versoFile: File | undefined = this.versoInput.getImageFile() || undefined;
      if (rectoFile && versoFile) {
        formData.append('recto', rectoFile);
        formData.append('verso', versoFile);
        this.apiHandler.register(formData).subscribe({
          next: (response:any) => {
            this.router.navigate(['/accueil'])
            this.loadingService.decrement();
          },
          error: (error:any) => {
            console.error(error);
            this.loadingService.decrement();
          }
        })
      }
    }
  }

}
