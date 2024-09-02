import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotisationComponentComponent } from './cotisation-component.component';

describe('CotisationComponentComponent', () => {
  let component: CotisationComponentComponent;
  let fixture: ComponentFixture<CotisationComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotisationComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotisationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
