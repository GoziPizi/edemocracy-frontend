import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleJackpotViewComponent } from './single-jackpot-view.component';

describe('SingleJackpotViewComponent', () => {
  let component: SingleJackpotViewComponent;
  let fixture: ComponentFixture<SingleJackpotViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleJackpotViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleJackpotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
