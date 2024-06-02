import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { LoadingService } from '../../../services/loading.service';
import { User } from '../../../models/users';
import { ImageInputComponent } from '../../../utils/image-input/image-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil-personals',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ImageInputComponent, CommonModule],
  templateUrl: './profil-personals.component.html',
  styleUrl: './profil-personals.component.scss'
})
export class ProfilPersonalsComponent {

  @ViewChild('imageInput') imageInput!: ImageInputComponent;

  updateInformationsForm = new FormGroup({
    telephone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    profession: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  user: User = new User();

  imageCorrectlyUploaded = false;

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(){
    this.fetchUser();
  }

  fetchUser(){
    this.loadingService.increment();
    this.apiHandler.getUser()!.subscribe({
      next: (data: User) => {
        this.user = data;
        this.loadingService.decrement();
        this.updateInformationsForm.patchValue({
          telephone: this.user.telephone,
          address: this.user.address,
          profession: this.user.profession,
          description: this.user.description
        })
        if(this.user.profilePicture){
          this.imageInput.setImage(this.user.profilePicture);
        }
      }, error: () => {
        this.loadingService.decrement();
      }
    });
  }

  onSubmit(){
    if(this.updateInformationsForm.valid){
      this.loadingService.increment();
      this.apiHandler.updateUser(this.updateInformationsForm.value).subscribe(() => {
        this.loadingService.decrement();
      });
    }
  }

  onSubmitImage(){
    if(this.imageInput.isThereAnImage()){
      this.loadingService.increment();
      const image = this.imageInput.getImageFile();
      if(image){
        this.apiHandler.updateUserImage(image).subscribe(() => {
          this.loadingService.decrement();
          this.imageCorrectlyUploaded = true;
          this.imageInput.removeImageFile();
        });
      }
      this.loadingService.decrement();
    }
  }

}
