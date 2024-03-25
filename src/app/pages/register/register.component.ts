import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiHandlerService } from '../../services/api-handler.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { professions } from './professions';
import { ImageInputComponent } from '../../utils/image-input/image-input.component';
import { PoliticSides } from '../../enums/politicSides';

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

      formData.append('telephone', '1234567890');
      formData.append('language', 'fr');
      formData.append('address', 'FR');
      formData.append('politicSide', PoliticSides.CENTER)

      formData.delete('passwordConfirmation');

      const rectoFile: File | undefined = this.rectoInput.getImageFile() || undefined;
      const versoFile: File | undefined = this.versoInput.getImageFile() || undefined;
      if (rectoFile && versoFile) {
        formData.append('recto', rectoFile);
        formData.append('verso', versoFile);
        this.apiHandler.register(formData).subscribe({
          next: (response:any) => {
            console.log(response);
          },
          error: (error:any) => {
            console.error(error);
          }
        })
      }
    }
  }

}
