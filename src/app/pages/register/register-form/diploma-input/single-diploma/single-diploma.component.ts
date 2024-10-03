import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { diplomas } from './diplomas';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-diploma',
  standalone: true,
  imports: [NgSelectModule, CommonModule, FormsModule],
  templateUrl: './single-diploma.component.html',
  styleUrl: './single-diploma.component.scss'
})
export class SingleDiplomaComponent {

  @Input() selectedYear: number = 2020;
  years : number[] = [];

  startYear: number = 1950;
  currentYear: number = new Date().getFullYear();

  @Input() selectedDiploma: string = '';
  diplomas: string[] = [];

  rawDiplomas = diplomas;

  manualInput: boolean = false;
  toggleManualInput() {
    this.manualInput = !this.manualInput;
  }

  constructor() {
    for (let i = this.currentYear; i >= this.startYear; i--) {
      this.years.push(i);
    }

    this.rawDiplomas.forEach(diploma => {
      this.diplomas.push(diploma.intitule_de_la_specialite_du_diplome_et_options + ' - ' + this.accurateReplace(diploma.niveau_du_diplome));
    });
  }

  accurateReplace(str: string) {

    let result = str;

    /*
    'Niveau 1' 'Master/Doctorat'
    'Niveau 2' 'License'
    'Niveau 3' 'BAC + 2'
    'Niveau 4' 'BAC'
    'Niveau 5' 'BEP/CAP'
    */

    if (str === 'Niveau 1') {
      result = 'Master/Doctorat';
    } else if (str === 'Niveau 2') {
      result = 'License';
    } else if (str === 'Niveau 3') {
      result = 'BAC + 2';
    } else if (str === 'Niveau 4') {
      result = 'BAC/BAC PRO';
    } else if (str === 'Niveau 5') {
      result = 'BEP/CAP';
    }
    return result;
  }

}
