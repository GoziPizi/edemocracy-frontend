import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgumentsDisplayerComponent } from './arguments-displayer.component';

describe('ArgumentsDisplayerComponent', () => {
  let component: ArgumentsDisplayerComponent;
  let fixture: ComponentFixture<ArgumentsDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArgumentsDisplayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArgumentsDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
