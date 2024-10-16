import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationThanksComponent } from './donation-thanks.component';

describe('DonationThanksComponent', () => {
  let component: DonationThanksComponent;
  let fixture: ComponentFixture<DonationThanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationThanksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonationThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
