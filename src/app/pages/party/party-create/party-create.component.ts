import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PoliticSides } from '../../../enums/politicSides';
import { CommonModule } from '@angular/common';
import { politicSideMapperEnumToUser } from '../../../mappers/politicside-mapper';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-party-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './party-create.component.html',
  styleUrl: './party-create.component.scss'
})
export class PartyCreateComponent {

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router,
    private loadingService: LoadingService,
    private toasterService: ToasterService
  ) { }

  partyCreationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required]),
    politicSide: new FormControl('', [Validators.required])
  })

  politicSides = Object.values(PoliticSides);

  mapperSideToString = politicSideMapperEnumToUser

  createParty() {
    if (this.partyCreationForm.valid) {
      this.loadingService.increment();
      this.apiHandler.createParty(this.partyCreationForm.value).subscribe({
        next: (response: any) => {
          this.loadingService.decrement();
          this.toasterService.success('Parti créé avec succès')
          this.router.navigate(['/partis', response.id])
        },
        error: error => {
          this.loadingService.decrement();
          this.toasterService.error('Erreur lors de la création du parti')
        }
      })
    }
  }

}
