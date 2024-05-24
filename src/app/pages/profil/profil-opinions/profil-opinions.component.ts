import { Component, ViewChild } from '@angular/core';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Opinion, OpinionWithTopicName } from '../../../models/opinions';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../services/loading.service';
import { TopicSelectorComponent } from '../../publish-topic/topic-selector/topic-selector.component';
import { PoliticSideDropdownItem } from '../../../models/politicSides';
import { politicSideMapperEnumToUser } from '../../../mappers/politicside-mapper';
import { PoliticSides } from '../../../enums/politicSides';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-profil-opinions',
  standalone: true,
  imports: [CommonModule, TopicSelectorComponent, FormsModule, NgSelectModule, ReactiveFormsModule],
  templateUrl: './profil-opinions.component.html',
  styleUrl: './profil-opinions.component.scss'
})
export class ProfilOpinionsComponent {

  @ViewChild('topicSelector') topicSelector!: TopicSelectorComponent;

  opinions: OpinionWithTopicName[] = [];
  isPopupOpen: boolean = false;
  opinionString: string = '';

  politicSideForm = new FormGroup({
    politicSide: new FormControl('', [Validators.required])
  });

  constructor(
    private apiHandler: ApiHandlerService, 
    private loadingService: LoadingService,
  ) { }

  ngOnInit(){
    this.fetchOpinions();
  }

  fetchOpinions(){
    this.loadingService.increment();
    this.apiHandler.getOpinions().subscribe({
      next: (data: OpinionWithTopicName[]) => {
        this.opinions = data;
        this.loadingService.decrement();
      },
      error: () => {
        this.loadingService.decrement();
      }
    });
  }

  deleteOpinion(opinionId: string){
    this.apiHandler.deleteOpinion(opinionId).subscribe({
      next: () => {
        this.opinions = this.opinions.filter(opinion => opinion.id !== opinionId);
      }, 
      error: (error: any) => {
        console.log('Error while deleting opinion', error);
      }
    });
  }

  addOpinion(){
    if(this.topicSelector.selectedTopic === null){
      return;
    }
    this.loadingService.increment();
    this.apiHandler.postOpinion(this.topicSelector.selectedTopic.id, this.opinionString).subscribe({
      next: (opinion) => {
        this.fetchOpinions();
        this.loadingService.decrement();
        this.closePopup();
      },
      error: () => {
        this.closePopup();
        this.loadingService.decrement();
      }
    });
  }

  openPopup(){
    this.isPopupOpen = true;
  }

  closePopup(){
    this.isPopupOpen = false;
  }

  get isValidateButtonEnabled(){
    if(this.topicSelector && this.topicSelector.selectedTopic && this.opinionString){
      return true;
    }
    return false;
  }

  get isOpinionTooLong(){
    return this.opinionString.length > 50;
  }

}
