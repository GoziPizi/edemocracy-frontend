import { Component, Input } from '@angular/core';
import { Topic } from '../../models/topics';
import { RouterModule } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-topic-thumbnail',
  standalone: true,
  imports: [RouterModule],
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

    navigator.clipboard.writeText('https://edemocracy.com/topic/' + this.topic.id).then(() => {
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

  get image() {
    return this.topic.medias[0] ? this.topic.medias[0] : '/assets/topic-fixtures.png'
  }

}
