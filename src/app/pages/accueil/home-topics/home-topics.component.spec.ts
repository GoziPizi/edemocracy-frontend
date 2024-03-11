import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTopicsComponent } from './home-topics.component';

describe('HomeTopicsComponent', () => {
  let component: HomeTopicsComponent;
  let fixture: ComponentFixture<HomeTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTopicsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
