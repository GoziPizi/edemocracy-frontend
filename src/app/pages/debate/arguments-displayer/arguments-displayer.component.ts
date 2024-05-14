import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { Argument } from '../../../models/argument';
import { CommonModule } from '@angular/common';
import { SingleArgumentPresentationComponent } from '../single-argument-presentation/single-argument-presentation.component';

@Component({
  selector: 'app-arguments-displayer',
  standalone: true,
  imports: [CommonModule, SingleArgumentPresentationComponent],
  templateUrl: './arguments-displayer.component.html',
  styleUrl: './arguments-displayer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArgumentsDisplayerComponent {

  @Input() arguments: Argument[] = [];

  setArgumentsList(value: Argument[]) {
    this.arguments = value;
  }

}
