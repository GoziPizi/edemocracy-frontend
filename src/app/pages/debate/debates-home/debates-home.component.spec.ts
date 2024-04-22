import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebatesHomeComponent } from './debates-home.component';

describe('DebatesHomeComponent', () => {
  let component: DebatesHomeComponent;
  let fixture: ComponentFixture<DebatesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebatesHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebatesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
