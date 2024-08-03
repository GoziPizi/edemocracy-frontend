import { Component, ViewChild } from '@angular/core';
import { ImageInputComponent } from '../../../../utils/image-input/image-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-id-input',
  standalone: true,
  imports: [ImageInputComponent, CommonModule, FormsModule],
  templateUrl: './id-input.component.html',
  styleUrl: './id-input.component.scss'
})
export class IdInputComponent {

  @ViewChild('firstRecto') firstRecto!: ImageInputComponent;
  @ViewChild('firstVerso') firstVerso!: ImageInputComponent;
  firstIdNumber: string = '';

  @ViewChild('secondRecto') secondRecto?: ImageInputComponent;
  @ViewChild('secondVerso') secondVerso?: ImageInputComponent;
  secondIdNumber: string = '';

  secondId = false;

  toggleSecondId() {
    this.secondId = !this.secondId;
  }

  get isSecondId() {
    return this.secondId;
  }

  get isFilled() {
    if(!this.firstRecto.isImageValid || !this.firstVerso.isImageValid || this.firstIdNumber.length < 2) {
      return false;
    }
    if(this.secondId) {
      return this.secondRecto?.isImageValid && this.secondVerso?.isImageValid && this.secondIdNumber.length >= 2;
    }
    return true;
  }

  get firstRectoImage() {
    return this.firstRecto.getImageFile();
  }

  get firstVersoImage() {
    return this.firstVerso.getImageFile();
  }

  get secondRectoImage() {
    return this.secondRecto?.getImageFile();
  }

  get secondVersoImage() {
    return this.secondVerso?.getImageFile();
  }
}
