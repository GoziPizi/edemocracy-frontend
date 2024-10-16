import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateAccueilThumbnailComponent } from './debate-accueil-thumbnail.component';

describe('DebateAccueilThumbnailComponent', () => {
  let component: DebateAccueilThumbnailComponent;
  let fixture: ComponentFixture<DebateAccueilThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebateAccueilThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DebateAccueilThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
