import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Moderation2PanelComponent } from './moderation2-panel.component';

describe('Moderation2PanelComponent', () => {
  let component: Moderation2PanelComponent;
  let fixture: ComponentFixture<Moderation2PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Moderation2PanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Moderation2PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
