import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DebateResult } from '../../../models/debate';

@Component({
  selector: 'app-for-against-debate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './for-against-debate.component.html',
  styleUrl: './for-against-debate.component.scss'
})
export class ForAgainstDebateComponent {

  debateResult: DebateResult = new DebateResult();

  setDebateResult(debateResult: DebateResult) {
    this.debateResult = debateResult;
  }

  get totalVotes() {
    return this.debateResult.nbReallyFor + this.debateResult.nbFor + this.debateResult.nbNeutral + this.debateResult.nbAgainst + this.debateResult.nbReallyAgainst;
  }

  get reallyForPourcentage() {
    if (this.totalVotes === 0) return 20;
    return this.debateResult.nbReallyFor / this.totalVotes * 100;
  }

  get forPourcentage() {
    if (this.totalVotes === 0) return 20;
    return this.debateResult.nbFor / this.totalVotes * 100;
  }

  get neutralPourcentage() {
    if (this.totalVotes === 0) return 20;
    return this.debateResult.nbNeutral / this.totalVotes * 100;
  }

  get againstPourcentage() {
    if (this.totalVotes === 0) return 20;
    return this.debateResult.nbAgainst / this.totalVotes * 100;
  }

  get reallyAgainstPourcentage() {
    if (this.totalVotes === 0) return 20;
    return this.debateResult.nbReallyAgainst / this.totalVotes * 100;
  }

  round(value: number) {
    return Math.round(value);
  }

}
