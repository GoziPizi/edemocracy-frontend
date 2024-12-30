import { Component, Input, ViewChild } from '@angular/core';
import { Debate, DebateResult } from '../../../models/debate';
import { ForAgainstDebateComponent } from "../../../pages/debate/for-against-debate/for-against-debate.component";
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debate-advanced-thumbnail',
  standalone: true,
  imports: [ForAgainstDebateComponent],
  templateUrl: './debate-advanced-thumbnail.component.html',
  styleUrl: './debate-advanced-thumbnail.component.scss'
})
export class DebateAdvancedThumbnailComponent {

  @Input() debate!: Debate;

  @ViewChild('result') forAgainstDebateComponent!: ForAgainstDebateComponent;

  constructor(
    private ApiHandlerService: ApiHandlerService,
    private Router: Router
  ) { }

  ngOnInit() {
    this.forAgainstDebateComponent.setDebateResult(this.debate.debateResult);
  }

  navigateToDebate(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.Router.navigate(['/debate', this.debate.id]);
  }



}
