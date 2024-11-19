import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestPopupComponent } from './contest-popup.component';

describe('ContestPopupComponent', () => {
  let component: ContestPopupComponent;
  let fixture: ComponentFixture<ContestPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContestPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
