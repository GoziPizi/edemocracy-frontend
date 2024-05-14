import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgumentDebatePresentationComponent } from './argument-debate-presentation.component';

describe('ArgumentDebatePresentationComponent', () => {
  let component: ArgumentDebatePresentationComponent;
  let fixture: ComponentFixture<ArgumentDebatePresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArgumentDebatePresentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArgumentDebatePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
