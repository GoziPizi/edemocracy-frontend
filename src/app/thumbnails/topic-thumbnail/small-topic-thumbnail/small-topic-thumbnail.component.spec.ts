import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallTopicThumbnailComponent } from './small-topic-thumbnail.component';

describe('SmallTopicThumbnailComponent', () => {
  let component: SmallTopicThumbnailComponent;
  let fixture: ComponentFixture<SmallTopicThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallTopicThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmallTopicThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
