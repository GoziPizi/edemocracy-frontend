import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorHistoricComponent } from './moderator-historic.component';

describe('ModeratorHistoricComponent', () => {
  let component: ModeratorHistoricComponent;
  let fixture: ComponentFixture<ModeratorHistoricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorHistoricComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeratorHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
