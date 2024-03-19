import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsDisplayerComponent } from './notifications-displayer.component';

describe('NotificationsDisplayerComponent', () => {
  let component: NotificationsDisplayerComponent;
  let fixture: ComponentFixture<NotificationsDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsDisplayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationsDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
