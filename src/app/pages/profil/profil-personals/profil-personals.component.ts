import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { LoadingService } from '../../../services/loading.service';
import { User } from '../../../models/users';

@Component({
  selector: 'app-profil-personals',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './profil-personals.component.html',
  styleUrl: './profil-personals.component.scss'
})
export class ProfilPersonalsComponent {

  updateInformationsForm = new FormGroup({
    telephone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    profession: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  user: User = new User();

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
    this.apiHandler.getUser().subscribe((data: User) => {
      this.user = data;
      this.loadingService.decrement();
      this.updateInformationsForm.patchValue({
        telephone: this.user.telephone,
        address: this.user.address,
        profession: this.user.profession,
        description: this.user.description
      })
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

}
