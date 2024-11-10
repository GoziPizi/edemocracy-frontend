import { Component, Input } from '@angular/core';
import { MediaDebateThumbnail } from '../accueil.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-debate-accueil-thumbnail',
  standalone: true,
  imports: [CommonModule, RouterModule, YouTubePlayerModule],
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

  get isVideo() {
    //Check if the url contains youtube
    return this.debate.media.includes('youtube');
  }

  get imageUrl() {
    return this.debate.media;
  }

  get videoId() {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[\?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = this.debate.media.match(regex);
    
    if (match && match[1]) {
        return match[1];
    }

    return '';
  }

}
