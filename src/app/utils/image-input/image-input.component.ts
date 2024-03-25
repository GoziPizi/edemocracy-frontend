import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.scss'
})
export class ImageInputComponent {

  @ViewChild('imageFileInput') imageFileInput!: ElementRef;

  @Input() tolerance: number = 0.05;
  @Input() ratio: number = 1;
  @Input() text: string = 'Upload Image';

  image: File = new File([], '');
  imagePreview: string | ArrayBuffer | null = null;

  width: number = 0;
  height: number = 0;

  isGoodRatio: boolean = true;

  constructor() { }

  onDragOver(event : any) {
    event.preventDefault();
  }

  onDropCover(event : any) {
    event.preventDefault();
    this.image = event.dataTransfer.files[0];
    this.updateImagePreview();
  }

  triggerFileInputCover() {
    this.imageFileInput.nativeElement.click();
  }

  onFileSelected(event : any) {
    this.image = event.target.files[0];
    this.updateImagePreview();
    this.isRationCorrect();
  }

  updateImagePreview() {
    let reader = new FileReader();
    reader.readAsDataURL(this.image);
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.updateImageSize();
    }
  }

  updateImageSize() {
    let img = new Image();
    img.src = URL.createObjectURL(this.image);
    img.onload = () => {
      this.width = img.width;
      this.height = img.height;
      this.isGoodRatio = Math.abs(this.width / this.height - this.ratio) < this.tolerance;
    }
  }

  removeImage() {
    this.image = new File([], '');
    this.imagePreview = null;
  }

  isThereAnImage(): boolean {
    if (this.image.size === 0) {
      return false;
    }
    return true;
  }

  isRationCorrect(): boolean {
    if (this.image.size === 0) {
      return false;
    }
    if (this.isGoodRatio) {
      return true;
    }
    return false;
  }

  getImageFile(): File | null {
    if (this.image.size === 0) {
      return null;
    }
    return this.image;
  }

}
