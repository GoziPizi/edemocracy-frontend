import { Component, Input } from '@angular/core';
import { Topic } from '../../models/topics';
import { RouterModule } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topic-thumbnail',
  standalone: true,
  imports: [RouterModule, CommonModule, YouTubePlayerModule],
  templateUrl: './topic-thumbnail.component.html',
  styleUrl: './topic-thumbnail.component.scss'
})
export class TopicThumbnailComponent {

  @Input() topic: Topic = new Topic();

  constructor(
    private toasterService: ToasterService
  ) {

  }

  share(event: any){

    event.stopPropagation();
    event.preventDefault();

    navigator.clipboard.writeText('https://digital-democracy.eu/topic/' + this.topic.id).then(() => {
      this.toasterService.success('Lien copié dans le presse-papier');
    }).catch(err => {
      this.toasterService.error('Erreur lors de la copie du texte');
    });
  }

  get title() {
    return this.topic ? this.topic.title : 'Titre du topic'
  }

  get description() {
    return this.topic ? this.topic.description : 'Description du topic'
  }

  get mediaType() {
    let link = this.topic.medias[0] ? this.topic.medias[0] : '';
    if(!link) return 'none';
    if(link.includes('youtu')) return 'video';
    else return 'image';
  }

  extractVideoID(url: string) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[\?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    const match = url.match(regex);
    
    if (match && match[1]) {
        return match[1];
    }

    return '';
  }

  get videoId() {
    let link = this.topic.medias[0] ? this.topic.medias[0] : '';
    if(!link) return '';
    if(link.includes('youtu')) return this.extractVideoID(link);
    else return ''; 
  }

  get image() {
    return this.topic.medias[0] ? this.topic.medias[0] : '/assets/topic-fixtures.png'
  }

}
