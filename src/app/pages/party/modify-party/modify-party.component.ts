import { Component, ViewChild } from '@angular/core';
import { politicSideMapperEnumToUser } from '../../../mappers/politicside-mapper';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Party } from '../../../models/party';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VerticalTopicSelectorComponent } from '../../../utils/topic-selector/vertical-topic-selector/vertical-topic-selector.component';
import { CommonModule } from '@angular/common';
import { PoliticSides } from '../../../enums/politicSides';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-modify-party',
  standalone: true,
  imports: [VerticalTopicSelectorComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './modify-party.component.html',
  styleUrl: './modify-party.component.scss'
})
export class ModifyPartyComponent {

  partyId: string = '';
  originalParty: Party = new Party();

  @ViewChild("forSelector") forSelector!: VerticalTopicSelectorComponent;
  @ViewChild("againstSelector") againstSelector!: VerticalTopicSelectorComponent;

  partyUpdateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required]),
    politicSide: new FormControl('', [Validators.required])
  });

  politicSides = Object.values(PoliticSides);

  mapperEnumToString = politicSideMapperEnumToUser;

  constructor(
    private route: ActivatedRoute,
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.partyId = this.route.snapshot.params['id'];
    this.getParty();
  }

  getParty() {
    this.apiHandler.getParty(this.partyId).subscribe((party: Party) => {
      this.originalParty = party;
      this.updateForm();
      this.forSelector.updateSelectedTopics(this.originalParty.for);
      this.againstSelector.updateSelectedTopics(this.originalParty.against);
    });
  }

  updateForm() {
    this.partyUpdateForm = new FormGroup({
      name: new FormControl(this.originalParty.name, [Validators.required]),
      description: new FormControl(this.originalParty.description, [Validators.required]),
      reason: new FormControl(this.originalParty.reason, [Validators.required]),
      politicSide: new FormControl(this.mapperEnumToString(this.originalParty.politicSide), [Validators.required])
    });
    this.partyUpdateForm.patchValue({ politicSide: this.originalParty.politicSide });
  }

  onSubmit() {
    this.loadingService.increment();
    if (this.partyUpdateForm.valid) {
      const data = {
        ...this.originalParty,
        ...this.partyUpdateForm.value,
        for: this.forSelector.getTopics(),
        against: this.againstSelector.getTopics()
      };
      this.apiHandler.updateParty(this.partyId, data).subscribe(
        (response: any) => {
          this.loadingService.decrement();
          this.router.navigate(['/partis', this.partyId]);
        }
      );
    }
  }

}
