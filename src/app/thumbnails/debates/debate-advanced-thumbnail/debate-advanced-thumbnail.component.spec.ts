import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateAdvancedThumbnailComponent } from './debate-advanced-thumbnail.component';

describe('DebateAdvancedThumbnailComponent', () => {
  let component: DebateAdvancedThumbnailComponent;
  let fixture: ComponentFixture<DebateAdvancedThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebateAdvancedThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebateAdvancedThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
