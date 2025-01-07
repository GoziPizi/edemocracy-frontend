import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalityPersonalDebateComponent } from './personality-personal-debate.component';

describe('PersonalityPersonalDebateComponent', () => {
  let component: PersonalityPersonalDebateComponent;
  let fixture: ComponentFixture<PersonalityPersonalDebateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalityPersonalDebateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalityPersonalDebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
