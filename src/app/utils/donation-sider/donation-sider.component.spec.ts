import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationSiderComponent } from './donation-sider.component';

describe('DonationSiderComponent', () => {
  let component: DonationSiderComponent;
  let fixture: ComponentFixture<DonationSiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationSiderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonationSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
