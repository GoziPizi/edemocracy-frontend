import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateThumbnailComponent } from './debate-thumbnail.component';

describe('DebateThumbnailComponent', () => {
  let component: DebateThumbnailComponent;
  let fixture: ComponentFixture<DebateThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebateThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebateThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
