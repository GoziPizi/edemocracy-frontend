import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyDebateComponent } from './party-debate.component';

describe('PartyDebateComponent', () => {
  let component: PartyDebateComponent;
  let fixture: ComponentFixture<PartyDebateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyDebateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyDebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
