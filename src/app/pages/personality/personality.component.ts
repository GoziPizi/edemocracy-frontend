import { Component, ViewChild } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { ActivatedRoute } from '@angular/router';
import { PersonalityWithUser } from '../../models/personality';
import { politicSideMapperEnumToUser } from '../../mappers/politicside-mapper';
import { OpinionsComponent } from './opinions/opinions.component';
import { CareerComponent } from './career/career.component';
import { SmallTopicThumbnailComponent } from '../../thumbnails/topic-thumbnail/small-topic-thumbnail/small-topic-thumbnail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personality',
  standalone: true,
  imports: [OpinionsComponent, CareerComponent, SmallTopicThumbnailComponent, CommonModule],
  templateUrl: './personality.component.html',
  styleUrl: './personality.component.scss'
})

export class PersonalityComponent {

  @ViewChild('opinionsDisplayer') opinionsDisplayer!: OpinionsComponent;

  constructor(
    private apiHandler: ApiHandlerService,
    private route: ActivatedRoute
  ) { }

  paramSubscription: any;
  personalityId: string = '';
  personality: PersonalityWithUser = new PersonalityWithUser();

  defaultImage = "../assets/default-profil.webp"

  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe({
      next: (params: any) => {
        this.personalityId = params.id;
        this.getPersonality();
      }
    })
  }

  getPersonality() {
    this.apiHandler.getPersonality(this.personalityId).subscribe({
      next: (response: any) => {
        this.personality = response;
        this.opinionsDisplayer.setPersonalityId(this.personalityId);
      },
      error: (error: any) => {
      }
    });
  }

  get politicSide() {
    return politicSideMapperEnumToUser(this.personality.user.politicSide);
  }

}
