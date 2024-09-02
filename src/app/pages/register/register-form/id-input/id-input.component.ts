import { Component, ViewChild } from '@angular/core';
import { ImageInputComponent } from '../../../../utils/image-input/image-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import nationalities from './nationality';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-id-input',
  standalone: true,
  imports: [ImageInputComponent, CommonModule, FormsModule, NgSelectModule],
  templateUrl: './id-input.component.html',
  styleUrl: './id-input.component.scss'
})
export class IdInputComponent {

  @ViewChild('firstRecto') firstRecto!: ImageInputComponent;
  @ViewChild('firstVerso') firstVerso!: ImageInputComponent;
  firstIdNumber: string = '';
  firstNationalityId: number = 0;

  @ViewChild('secondRecto') secondRecto?: ImageInputComponent;
  @ViewChild('secondVerso') secondVerso?: ImageInputComponent;
  secondIdNumber: string = '';
  secondNationalityId: number = 0;

  @ViewChild('thirdRecto') thirdRecto?: ImageInputComponent;
  @ViewChild('thirdVerso') thirdVerso?: ImageInputComponent;
  thirdIdNumber: string = '';
  thirdNationalityId: number = 0;

  secondId = false;
  thirdId = false;

  nationalities = nationalities;

  toggleSecondId() {
    this.secondId = !this.secondId;
    if(!this.secondId) {
      this.thirdId = false;
    }
  }

  toggleThirdId() {
    this.thirdId = !this.thirdId;
  }

  get isSecondId() {
    return this.secondId;
  }

  get isThirdId() {
    return this.thirdId;
  }

  get isFilled() {
    if(!this.firstRecto.isImageValid || !this.firstVerso.isImageValid || this.firstIdNumber.length < 2 || this.firstNationalityId === 0) {
      return false;
    }
    if(this.secondId) {
      return this.secondRecto?.isImageValid && this.secondVerso?.isImageValid && this.secondIdNumber.length >= 2 && this.secondNationalityId !== 0;
    }
    if(this.thirdId) {
      return this.thirdRecto?.isImageValid && this.thirdVerso?.isImageValid && this.thirdIdNumber.length >= 2 && this.thirdNationalityId !== 0;
    }
    return true;
  }

  get firstRectoImage() {
    return this.firstRecto.getImageFile();
  }

  get firstVersoImage() {
    return this.firstVerso.getImageFile();
  }

  get firstId() {
    return this.firstIdNumber;
  }

  get firstNationality() {
    return this.firstNationalityId
  }

  get secondRectoImage() {
    return this.secondRecto?.getImageFile();
  }

  get secondVersoImage() {
    return this.secondVerso?.getImageFile();
  }

  get secondIdNumberGet() {
    return this.secondIdNumber;
  }

  get secondNationality() {
    return this.secondNationalityId
  }

  get thirdRectoImage() {
    return this.thirdRecto?.getImageFile();
  }

  get thirdVersoImage() {
    return this.thirdVerso?.getImageFile();
  }

  get thirdIdNumberGet() {
    return this.thirdIdNumber;
  }

  get thirdNationality() {
    return this.thirdNationalityId
  }
}
