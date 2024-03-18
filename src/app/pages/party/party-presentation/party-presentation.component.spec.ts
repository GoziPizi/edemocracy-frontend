import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyPresentationComponent } from './party-presentation.component';

describe('PartyPresentationComponent', () => {
  let component: PartyPresentationComponent;
  let fixture: ComponentFixture<PartyPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyPresentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
