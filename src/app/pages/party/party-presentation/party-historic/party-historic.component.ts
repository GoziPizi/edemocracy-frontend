import { Component, Input } from '@angular/core';
import { HistoricEventParty } from '../../../../models/historicEventParty';
import { CommonModule } from '@angular/common';
import { HistoricEventComponent } from './historic-event/historic-event.component';
import { ApiHandlerService } from '../../../../services/api-handler.service';
import { sortEventsByDateDesc } from '../../../../utils/sortingFunctions';

@Component({
  selector: 'app-party-historic',
  standalone: true,
  imports: [CommonModule, HistoricEventComponent],
  templateUrl: './party-historic.component.html',
  styleUrl: './party-historic.component.scss'
})
export class PartyHistoricComponent {

  @Input() partyId!: string;

  historicEvents: HistoricEventParty[] = [];

  constructor(
    private apiHandler: ApiHandlerService
  ) { }

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.apiHandler.getAllHistoricEvents(this.partyId).subscribe((events: any) => {
      this.historicEvents = sortEventsByDateDesc(events);
    });
  }

}
