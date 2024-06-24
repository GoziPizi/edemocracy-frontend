import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFollowDisplayComponent } from './single-follow-display.component';

describe('SingleFollowDisplayComponent', () => {
  let component: SingleFollowDisplayComponent;
  let fixture: ComponentFixture<SingleFollowDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleFollowDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleFollowDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
