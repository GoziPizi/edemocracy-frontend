import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCommentReportThumbnailComponent } from './single-comment-report-thumbnail.component';

describe('SingleCommentReportThumbnailComponent', () => {
  let component: SingleCommentReportThumbnailComponent;
  let fixture: ComponentFixture<SingleCommentReportThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCommentReportThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleCommentReportThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
