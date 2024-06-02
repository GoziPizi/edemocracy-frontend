import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReformulationReportThumbnailComponent } from './single-reformulation-report-thumbnail.component';

describe('SingleReformulationReportThumbnailComponent', () => {
  let component: SingleReformulationReportThumbnailComponent;
  let fixture: ComponentFixture<SingleReformulationReportThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleReformulationReportThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleReformulationReportThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
