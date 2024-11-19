import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReportOverviewComponent } from './single-report-overview.component';

describe('SingleReportOverviewComponent', () => {
  let component: SingleReportOverviewComponent;
  let fixture: ComponentFixture<SingleReportOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleReportOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleReportOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
