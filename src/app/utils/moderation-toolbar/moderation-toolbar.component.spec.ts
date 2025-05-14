import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerationToolbarComponent } from './moderation-toolbar.component';

describe('ModerationToolbarComponent', () => {
  let component: ModerationToolbarComponent;
  let fixture: ComponentFixture<ModerationToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModerationToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModerationToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
