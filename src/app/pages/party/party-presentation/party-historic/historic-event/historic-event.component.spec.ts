import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricEventComponent } from './historic-event.component';

describe('HistoricEventComponent', () => {
  let component: HistoricEventComponent;
  let fixture: ComponentFixture<HistoricEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
