import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerationStaffComponent } from './moderation-staff.component';

describe('ModerationStaffComponent', () => {
  let component: ModerationStaffComponent;
  let fixture: ComponentFixture<ModerationStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModerationStaffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModerationStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
