import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyMembersComponent } from './party-members.component';

describe('PartyMembersComponent', () => {
  let component: PartyMembersComponent;
  let fixture: ComponentFixture<PartyMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
