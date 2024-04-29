import { Component, Input } from '@angular/core';
import { Topic } from '../../../../models/topics';

@Component({
  selector: 'app-topic-selector-result',
  standalone: true,
  imports: [],
  templateUrl: './topic-selector-result.component.html',
  styleUrl: './topic-selector-result.component.scss'
})
export class TopicSelectorResultComponent {

  @Input() topic!: Topic

}
