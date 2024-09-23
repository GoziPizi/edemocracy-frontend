import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipDashboardComponent } from './sponsorship-dashboard.component';

describe('SponsorshipDashboardComponent', () => {
  let component: SponsorshipDashboardComponent;
  let fixture: ComponentFixture<SponsorshipDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsorshipDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SponsorshipDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
