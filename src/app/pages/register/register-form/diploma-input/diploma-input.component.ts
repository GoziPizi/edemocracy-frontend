import { Component, QueryList, ViewChildren } from '@angular/core';
import { SingleDiplomaComponent } from './single-diploma/single-diploma.component';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-diploma-input',
  standalone: true,
  imports: [SingleDiplomaComponent, SingleDiplomaComponent, CommonModule],
  templateUrl: './diploma-input.component.html',
  styleUrl: './diploma-input.component.scss'
})
export class DiplomaInputComponent {

  @ViewChildren(SingleDiplomaComponent) diplomaComponents!: QueryList <SingleDiplomaComponent>;

  diplomas : {name: string, obtention: string}[] = [];

  addDiploma() {
    this.diplomas.push({name: '', obtention: ''});
  }

  removeDiploma() {
    this.diplomas.pop();
  }

  getDiplomas() {
    let diplomas: {name: string, obtention: number}[] = [];

    this.diplomaComponents.forEach(diplomaComponent => {
      diplomas.push({
        name: diplomaComponent.selectedDiploma,
        obtention: diplomaComponent.selectedYear
      });
    });

    return diplomas;

  }

}
