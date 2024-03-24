import { Component, Input } from '@angular/core';
import { HistoricEventParty } from '../../../../../models/historicEventParty';

@Component({
  selector: 'app-historic-event',
  standalone: true,
  imports: [],
  templateUrl: './historic-event.component.html',
  styleUrl: './historic-event.component.scss'
})
export class HistoricEventComponent {

  @Input() event!: HistoricEventParty;

}
