import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyHistoricComponent } from './party-historic.component';

describe('PartyHistoricComponent', () => {
  let component: PartyHistoricComponent;
  let fixture: ComponentFixture<PartyHistoricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyHistoricComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
