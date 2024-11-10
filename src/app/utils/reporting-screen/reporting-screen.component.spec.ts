import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingScreenComponent } from './reporting-screen.component';

describe('ReportingScreenComponent', () => {
  let component: ReportingScreenComponent;
  let fixture: ComponentFixture<ReportingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportingScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
