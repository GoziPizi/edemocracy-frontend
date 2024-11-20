import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePersonalReportComponent } from './single-personal-report.component';

describe('SinglePersonalReportComponent', () => {
  let component: SinglePersonalReportComponent;
  let fixture: ComponentFixture<SinglePersonalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglePersonalReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinglePersonalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
