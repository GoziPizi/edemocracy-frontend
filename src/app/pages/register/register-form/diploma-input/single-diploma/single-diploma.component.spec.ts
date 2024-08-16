import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDiplomaComponent } from './single-diploma.component';

describe('SingleDiplomaComponent', () => {
  let component: SingleDiplomaComponent;
  let fixture: ComponentFixture<SingleDiplomaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleDiplomaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleDiplomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
