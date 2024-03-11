import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalitySearchComponent } from './personality-search.component';

describe('PersonalitySearchComponent', () => {
  let component: PersonalitySearchComponent;
  let fixture: ComponentFixture<PersonalitySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalitySearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalitySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
