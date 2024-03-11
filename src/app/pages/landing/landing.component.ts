import { Component } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})

export class LandingComponent {

  constructor(
    private apiHandler: ApiHandlerService,
    private router: Router
  ) { }

  loginSubscription: any;

  ngOnInit() { }

}
