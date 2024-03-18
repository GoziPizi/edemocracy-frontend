import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTopicSelectorComponent } from './vertical-topic-selector.component';

describe('VerticalTopicSelectorComponent', () => {
  let component: VerticalTopicSelectorComponent;
  let fixture: ComponentFixture<VerticalTopicSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalTopicSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalTopicSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
