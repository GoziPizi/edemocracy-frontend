import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartySearchFormComponent } from './party-search-form.component';

describe('PartySearchFormComponent', () => {
  let component: PartySearchFormComponent;
  let fixture: ComponentFixture<PartySearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartySearchFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
