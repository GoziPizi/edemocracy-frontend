import { Component, ViewChildren } from '@angular/core';
import { ImageInputComponent } from '../../../../utils/image-input/image-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-id-input',
  standalone: true,
  imports: [ImageInputComponent, CommonModule],
  templateUrl: './id-input.component.html',
  styleUrl: './id-input.component.scss'
})
export class IdInputComponent {

  @ViewChildren('firstRecto') firstRecto!: ImageInputComponent;
  @ViewChildren('firstVerso') firstVerso!: ImageInputComponent;
  @ViewChildren('secondRecto') secondRecto?: ImageInputComponent;
  @ViewChildren('secondVerso') secondVerso?: ImageInputComponent;

  secondId = false;

  toggleSecondId() {
    this.secondId = !this.secondId;
  }

  get isSecondId() {
    return this.secondId;
  }
}
