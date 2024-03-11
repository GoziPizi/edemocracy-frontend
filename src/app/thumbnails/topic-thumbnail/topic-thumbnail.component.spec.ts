import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicThumbnailComponent } from './topic-thumbnail.component';

describe('TopicThumbnailComponent', () => {
  let component: TopicThumbnailComponent;
  let fixture: ComponentFixture<TopicThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
