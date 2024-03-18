import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForAgainstDebateComponent } from './for-against-debate.component';

describe('ForAgainstDebateComponent', () => {
  let component: ForAgainstDebateComponent;
  let fixture: ComponentFixture<ForAgainstDebateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForAgainstDebateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForAgainstDebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
