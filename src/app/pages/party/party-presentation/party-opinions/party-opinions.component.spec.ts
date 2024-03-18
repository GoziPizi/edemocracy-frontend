import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyOpinionsComponent } from './party-opinions.component';

describe('PartyOpinionsComponent', () => {
  let component: PartyOpinionsComponent;
  let fixture: ComponentFixture<PartyOpinionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyOpinionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyOpinionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
