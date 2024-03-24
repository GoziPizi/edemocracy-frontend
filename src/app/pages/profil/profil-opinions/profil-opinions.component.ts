import { Component } from '@angular/core';
import { ApiHandlerService } from '../../../services/api-handler.service';
import { Opinion, OpinionWithTopicName } from '../../../models/opinions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil-opinions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil-opinions.component.html',
  styleUrl: './profil-opinions.component.scss'
})
export class ProfilOpinionsComponent {

  opinions: OpinionWithTopicName[] = [];

  constructor(
    private apiHandler: ApiHandlerService
  ) {}

  ngOnInit(){
    this.fetchOpinions();
  }

  fetchOpinions(){
    this.apiHandler.getOpinions().subscribe((data: OpinionWithTopicName[]) => {
      this.opinions = data;
    });
  }

}
