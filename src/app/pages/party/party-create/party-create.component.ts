import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PoliticSides } from '../../../enums/politicSides';
import { CommonModule } from '@angular/common';
import { politicSideMapperEnumToUser } from '../../../mappers/politicside-mapper';
import { ApiHandlerService } from '../../../services/api-handler.service';

@Component({
  selector: 'app-party-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './party-create.component.html',
  styleUrl: './party-create.component.scss'
})
export class PartyCreateComponent {

  constructor(
    private apiHandler: ApiHandlerService
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
      this.apiHandler.createParty(this.partyCreationForm.value).subscribe(
        (response) => {
        }
      )
    }
  }

}
