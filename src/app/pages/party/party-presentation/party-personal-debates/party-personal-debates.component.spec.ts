import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyPersonalDebatesComponent } from './party-personal-debates.component';

describe('PartyPersonalDebatesComponent', () => {
  let component: PartyPersonalDebatesComponent;
  let fixture: ComponentFixture<PartyPersonalDebatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyPersonalDebatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyPersonalDebatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
