import { Component } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { ActivatedRoute } from '@angular/router';
import { PersonalityWithUser } from '../../models/personality';
import { politicSideMapperEnumToUser } from '../../mappers/politicside-mapper';
import { OpinionsComponent } from './opinions/opinions.component';
import { CareerComponent } from './career/career.component';

@Component({
  selector: 'app-personality',
  standalone: true,
  imports: [OpinionsComponent, CareerComponent],
  templateUrl: './personality.component.html',
  styleUrl: './personality.component.scss'
})

export class PersonalityComponent {

  constructor(
    private apiHandler: ApiHandlerService,
    private route: ActivatedRoute
  ) { }

  paramSubscription: any;
  personalityId: string = '';
  personality: PersonalityWithUser = new PersonalityWithUser();

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
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  get politicSide() {
    return politicSideMapperEnumToUser(this.personality.user.politicSide);
  }

}
