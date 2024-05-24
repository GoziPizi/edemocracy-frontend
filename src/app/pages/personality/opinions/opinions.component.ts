import { Component, Input } from '@angular/core';
import { OpinionWithTopicName } from '../../../models/opinions';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { LoadingService } from '../../../services/loading.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-opinions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './opinions.component.html',
  styleUrl: './opinions.component.scss'
})
export class OpinionsComponent {

  personalityId: string = '';
  
  opinionsWithTopicName: OpinionWithTopicName[] = [];

  constructor(
    private apiHandler: ApiHandlerService,
    private loadingService: LoadingService,
  ) { }

  setPersonalityId(personalityId: string){
    this.personalityId = personalityId;
    this.fetchOpinions();
  }

  fetchOpinions(){
    this.loadingService.increment();
    this.apiHandler.getPersonalityOpinions(this.personalityId).subscribe({
      next: (data: OpinionWithTopicName[]) => {
        this.opinionsWithTopicName = data;
        this.loadingService.decrement();
      },
      error: () => {
        this.loadingService.decrement();
      }
    });
  }

}
