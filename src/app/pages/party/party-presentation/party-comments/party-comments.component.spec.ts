import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyCommentsComponent } from './party-comments.component';

describe('PartyCommentsComponent', () => {
  let component: PartyCommentsComponent;
  let fixture: ComponentFixture<PartyCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyCommentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
