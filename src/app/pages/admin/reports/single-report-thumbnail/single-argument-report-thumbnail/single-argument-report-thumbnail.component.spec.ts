import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleArgumentReportThumbnailComponent } from './single-argument-report-thumbnail.component';

describe('SingleArgumentReportThumbnailComponent', () => {
  let component: SingleArgumentReportThumbnailComponent;
  let fixture: ComponentFixture<SingleArgumentReportThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleArgumentReportThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleArgumentReportThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
