import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenTopicComponent } from './children-topic.component';

describe('ChildrenTopicComponent', () => {
  let component: ChildrenTopicComponent;
  let fixture: ComponentFixture<ChildrenTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildrenTopicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChildrenTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
