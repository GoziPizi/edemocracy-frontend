import { Component } from '@angular/core';
import { User } from '../../../../models/users';
import { ApiHandlerService } from '../../../../services/api-handler.service';
import { ToasterService } from '../../../../services/toaster.service';

@Component({
  selector: 'app-moderation-staff',
  standalone: true,
  imports: [],
  templateUrl: './moderation-staff.component.html',
  styleUrl: './moderation-staff.component.scss'
})
export class ModerationStaffComponent {

  moderators: User[] = []

  constructor(
    private apiHandler : ApiHandlerService,
    private toaster: ToasterService
  ) {

  }

  fetchModerators() {
    this.apiHandler.getModerators().subscribe({
      next: (moderators: User[]) => {
        this.moderators = moderators
      }, 
      error: (error:any) => {
        this.toaster.error('Errur lors de la récupération des modérateurs')
      }
    })
  }

  setRole(email: string, role: string) {
    this.apiHandler.setRole(email, role).subscribe({
      next: (value: any) => {
        this.toaster.success('Rôle mis à jour')
        this.fetchModerators()
      }, 
      error: (error: any) => {
        this.toaster.error('Impossible de mettre le rôle à jour.')
      }
    })
  }

}
