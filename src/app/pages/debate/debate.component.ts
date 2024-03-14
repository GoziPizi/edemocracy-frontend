import { Component } from '@angular/core';
import { Debate } from '../../models/debate';
import { ApiHandlerService } from '../../services/api-handler.service';
import { Argument } from '../../models/argument';
import { ActivatedRoute } from '@angular/router';
import { ArgumentForDebateThumbnailComponent } from '../../thumbnails/arguments/argument-for-debate-thumbnail/argument-for-debate-thumbnail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-debate',
  standalone: true,
  imports: [ArgumentForDebateThumbnailComponent, CommonModule],
  templateUrl: './debate.component.html',
  styleUrl: './debate.component.scss'
})
export class DebateComponent {

  debateId: string = '1';
  debate: Debate = new Debate();
  arguments: Argument[] = [];

  routeSubscription: any;

  constructor(
    private apiHandler: ApiHandlerService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.debateId = params['id'];
      this.getDebate();
      this.getDebateArguments();
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  getDebate() {
    this.apiHandler.getDebate(this.debateId).subscribe(
      (debate: Debate) => {
        this.debate = debate;
      }
    );
  }

  getDebateArguments() {
    this.apiHandler.getDebateArguments(this.debateId).subscribe(
      (args: Argument[]) => {
        this.arguments = args;
        console.log(this.arguments);
      }
    );
  }

  get popularArguments(): Argument[] {
    return this.arguments.sort((a, b) => {
      return (b.nbGood + b.nbBad);
    });
  }

  get recentArguments(): Argument[] {
    return this.arguments.sort((a, b) => {
      return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });
  }

}
