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
import { HistoricEventComponent } from '../party-presentation/party-historic/historic-event/historic-event.component';
import { HistoricEventParty } from '../../../models/historicEventParty';
import { sortEventsByDateDesc } from '../../../utils/sortingFunctions';
import { ImageInputComponent } from '../../../utils/image-input/image-input.component';
import { ToasterService } from '../../../services/toaster.service';

@Component({
  selector: 'app-modify-party',
  standalone: true,
  imports: [VerticalTopicSelectorComponent, FormsModule, ReactiveFormsModule, CommonModule, HistoricEventComponent, ImageInputComponent],
  templateUrl: './modify-party.component.html',
  styleUrl: './modify-party.component.scss'
})
export class ModifyPartyComponent {

  partyId: string = '';
  originalParty: Party = new Party();

  events: HistoricEventParty[] = [];

  @ViewChild("imageInput") imageInput!: ImageInputComponent;
  @ViewChild("forSelector") forSelector!: VerticalTopicSelectorComponent;
  @ViewChild("againstSelector") againstSelector!: VerticalTopicSelectorComponent;

  partyUpdateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required]),
    politicSide: new FormControl('', [Validators.required])
  });

  createEventForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    dateStart: new FormControl('', [Validators.required]),
    dateEnd: new FormControl('', [Validators.required])
  });

  politicSides = Object.values(PoliticSides);

  mapperEnumToString = politicSideMapperEnumToUser;

  constructor(
    private route: ActivatedRoute,
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService,
    private router: Router,
    private toasterService: ToasterService
  ) {
    this.partyId = this.route.snapshot.params['id'];
    this.getParty();
    this.fetchEvents();
  }

  getParty() {
    this.loadingService.increment();
    this.apiHandler.getParty(this.partyId).subscribe({
      next: (party: any) => {
        this.loadingService.decrement();
        this.originalParty = party;
        this.updateForm();
        this.forSelector.updateSelectedTopics(this.originalParty.for);
        this.againstSelector.updateSelectedTopics(this.originalParty.against);
        this.imageInput.setImage(this.originalParty.logo);
      },
      error: () => {
        this.loadingService.decrement();
        this.toasterService.error('Erreur lors de la récupération du parti');
      }
    });
  }

  fetchEvents() {
    this.apiHandler.getAllHistoricEvents(this.partyId).subscribe((events: any) => {
      this.events = sortEventsByDateDesc(events);
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
      this.apiHandler.updateParty(this.partyId, data).subscribe({
        next: () => {
          this.loadingService.decrement();
          this.toasterService.success('Parti mis à jour');
          this.router.navigate(['/partis', this.partyId]);
        },
        error: () => {
          this.loadingService.decrement();
          this.toasterService.error('Erreur lors de la mise à jour du parti');
        }
      });
    }
    this.loadingService.decrement();
  }

  createEvent() {
    this.loadingService.increment();
    if (this.createEventForm.valid) {
      let form: any = {
        title: this.createEventForm.get('title')?.value,
        content: this.createEventForm.get('content')?.value,
      };
      let dateStart = this.createEventForm.get('dateStart')?.value;
      let dateEnd = this.createEventForm.get('dateEnd')?.value;
      dateStart = dateStart ? new Date(dateStart).toISOString() : '';
      dateEnd = dateEnd ? new Date(dateEnd).toISOString() : '';

      form = {
        ...form,
        dateStart,
        dateEnd
      };

      this.apiHandler.postHistoricEvent(this.partyId, form).subscribe({
        next: () => {
          this.fetchEvents();
          this.toasterService.success('Evénement ajouté');
          this.loadingService.decrement();
          this.createEventForm.reset();
        },
        error: () => {
          this.toasterService.error('Erreur lors de la création de l\'événement');
          this.loadingService.decrement();
        }
      });
    }
    this.loadingService.decrement();
  }

  deleteEvent(eventId: string) {
    this.loadingService.increment();
    this.apiHandler.deleteHistoricEvent(this.partyId,eventId).subscribe({
      next: () => {
        this.fetchEvents();
        this.toasterService.success('Evénement supprimé');
        this.loadingService.decrement();
      },
      error: () => {
        this.toasterService.error('Erreur lors de la suppression de l\'événement');
        this.loadingService.decrement();
      }
    });
  }

  uploadLogo() {
    const logo = this.imageInput.getImageFile();
    if (logo) {
      this.loadingService.increment();
      this.apiHandler.updatePartyLogo(this.partyId, logo).subscribe({
        next: () => {
          this.toasterService.success('Logo mis à jour');
          this.loadingService.decrement();
        },
        error: () => {
          this.toasterService.error('Erreur lors de la mise à jour du logo');
          this.loadingService.decrement();
        }
      });
    }
  }
}
