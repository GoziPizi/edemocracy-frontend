import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReformulationPresentationComponent } from './single-reformulation-presentation.component';

describe('SingleReformulationPresentationComponent', () => {
  let component: SingleReformulationPresentationComponent;
  let fixture: ComponentFixture<SingleReformulationPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleReformulationPresentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleReformulationPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
