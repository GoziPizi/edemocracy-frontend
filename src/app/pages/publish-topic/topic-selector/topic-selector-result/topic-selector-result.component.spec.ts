import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSelectorResultComponent } from './topic-selector-result.component';

describe('TopicSelectorResultComponent', () => {
  let component: TopicSelectorResultComponent;
  let fixture: ComponentFixture<TopicSelectorResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicSelectorResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicSelectorResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
