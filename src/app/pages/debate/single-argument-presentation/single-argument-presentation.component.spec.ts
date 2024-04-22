import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleArgumentPresentationComponent } from './single-argument-presentation.component';

describe('SingleArgumentPresentationComponent', () => {
  let component: SingleArgumentPresentationComponent;
  let fixture: ComponentFixture<SingleArgumentPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleArgumentPresentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleArgumentPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
