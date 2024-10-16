import { Component, Input } from '@angular/core';
import { MediaDebateThumbnail } from '../accueil.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-debate-accueil-thumbnail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './debate-accueil-thumbnail.component.html',
  styleUrl: './debate-accueil-thumbnail.component.scss'
})
export class DebateAccueilThumbnailComponent {
  @Input() debate! : MediaDebateThumbnail;

  constructor() { }

  ngOnInit() { }

  get nbVotants() {
    return this.debate.debateResult.nbReallyFor
      + this.debate.debateResult.nbReallyAgainst
      + this.debate.debateResult.nbNeutral
      + this.debate.debateResult.nbFor
      + this.debate.debateResult.nbAgainst
  }

  get deepGreenWidth() {
    if(this.nbVotants === 0) {
      return '20%';
    }
    return `${this.debate.debateResult.nbReallyFor / this.nbVotants * 100}%`;
  }

  get lightGreenWidth() {
    if(this.nbVotants === 0) {
      return '20%';
    }
    return `${this.debate.debateResult.nbFor / this.nbVotants * 100}%`;
  }

  get grayWidth() {
    if(this.nbVotants === 0) {
      return '20%';
    }
    return `${this.debate.debateResult.nbNeutral / this.nbVotants * 100}%`;
  }

  get lightRedWidth() {
    if(this.nbVotants === 0) {
      return '20%';
    }
    return `${this.debate.debateResult.nbAgainst / this.nbVotants * 100}%`;
  }

  get deepRedWidth() {
    if(this.nbVotants === 0) {
      return '20%';
    }
    return `${this.debate.debateResult.nbReallyAgainst / this.nbVotants * 100}%`;
  }

}
