import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterThankComponent } from './register-thank.component';

describe('RegisterThankComponent', () => {
  let component: RegisterThankComponent;
  let fixture: ComponentFixture<RegisterThankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterThankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterThankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
