import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerationDashboardComponent } from './moderation-dashboard.component';

describe('ModerationDashboardComponent', () => {
  let component: ModerationDashboardComponent;
  let fixture: ComponentFixture<ModerationDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModerationDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModerationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
