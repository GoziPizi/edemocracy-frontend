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

  constructor() {
    for (let i = this.currentYear; i >= this.startYear; i--) {
      this.years.push(i);
    }

    this.rawDiplomas.forEach(diploma => {
      this.diplomas.push(diploma.intitule_de_la_specialite_du_diplome_et_options + ' - ' + diploma.niveau_du_diplome.replace('Niveau ', 'BAC + '));
    });
  }

}
