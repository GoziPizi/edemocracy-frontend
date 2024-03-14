import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgumentForDebateThumbnailComponent } from './argument-for-debate-thumbnail.component';

describe('ArgumentForDebateThumbnailComponent', () => {
  let component: ArgumentForDebateThumbnailComponent;
  let fixture: ComponentFixture<ArgumentForDebateThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArgumentForDebateThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArgumentForDebateThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
