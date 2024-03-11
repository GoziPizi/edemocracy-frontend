import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalitySearchFormComponent } from './personality-search-form.component';

describe('PersonalitySearchFormComponent', () => {
  let component: PersonalitySearchFormComponent;
  let fixture: ComponentFixture<PersonalitySearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalitySearchFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalitySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
