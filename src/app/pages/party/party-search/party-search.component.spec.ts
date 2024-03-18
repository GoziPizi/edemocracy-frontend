import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartySearchComponent } from './party-search.component';

describe('PartySearchComponent', () => {
  let component: PartySearchComponent;
  let fixture: ComponentFixture<PartySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartySearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
