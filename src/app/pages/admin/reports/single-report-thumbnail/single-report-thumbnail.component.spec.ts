import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReportThumbnailComponent } from './single-report-thumbnail.component';

describe('SingleReportThumbnailComponent', () => {
  let component: SingleReportThumbnailComponent;
  let fixture: ComponentFixture<SingleReportThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleReportThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleReportThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
