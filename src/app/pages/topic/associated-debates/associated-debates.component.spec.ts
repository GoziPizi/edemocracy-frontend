import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedDebatesComponent } from './associated-debates.component';

describe('AssociatedDebatesComponent', () => {
  let component: AssociatedDebatesComponent;
  let fixture: ComponentFixture<AssociatedDebatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociatedDebatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociatedDebatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
