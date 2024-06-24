import { Component, Input } from '@angular/core';
import { ApiHandlerService } from '../../services/api-handler.service';
import { CommonModule } from '@angular/common';
import { ToasterService } from '../../services/toaster.service';
import { VisitorService } from '../../services/visitor.service';

@Component({
  selector: 'app-follow-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './follow-button.component.html',
  styleUrl: './follow-button.component.scss'
})
export class FollowButtonComponent {

  @Input() entityId!: string;
  @Input() entityType!: string;

  isFollowing = false;

  constructor(
    private apiHandlerService: ApiHandlerService,
    private toastr: ToasterService,
    private visitorService: VisitorService
  ) {
  }

  ngOnInit() {
    if(this.isVisitor){
      return;
    }
    this.fetchFollowStatus();
  }

  fetchFollowStatus() {
    this.apiHandlerService.getFollowStatus(this.entityId).subscribe({
      next: (response: any) => {
        this.isFollowing = response;
      },error: (error) => {
        this.isFollowing = false;
      } 

    });
  }

  follow(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.apiHandlerService.follow(this.entityId, this.entityType).subscribe({
      next: () => {
        this.toastr.success('Suivi mis à jour')
        this.fetchFollowStatus();
      },error: (error: any) => {
        console.error(error);
      }
    });
  }

  get isFollowed() {
    return this.isFollowing;
  }

  get isVisitor() {
    return this.visitorService.getIsVisitor();
  }
}
