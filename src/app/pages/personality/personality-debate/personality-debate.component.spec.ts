import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalityDebateComponent } from './personality-debate.component';

describe('PersonalityDebateComponent', () => {
  let component: PersonalityDebateComponent;
  let fixture: ComponentFixture<PersonalityDebateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalityDebateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalityDebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
