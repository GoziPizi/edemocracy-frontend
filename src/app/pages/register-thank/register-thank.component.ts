import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-register-thank',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './register-thank.component.html',
  styleUrl: './register-thank.component.scss',
  animations: [
    trigger('fadeInUp', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('1s ease-out')
      ])
    ])
  ]
})
export class RegisterThankComponent {

  state = 'hidden';

  ngOnInit() {
    setTimeout(() => {
      this.state = 'visible';
    }, 0);
  }
}
