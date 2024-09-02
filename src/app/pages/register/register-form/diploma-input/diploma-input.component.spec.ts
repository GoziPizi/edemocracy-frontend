import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaInputComponent } from './diploma-input.component';

describe('DiplomaInputComponent', () => {
  let component: DiplomaInputComponent;
  let fixture: ComponentFixture<DiplomaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiplomaInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiplomaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
