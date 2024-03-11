import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalityResultThumbnailComponent } from './personality-result-thumbnail.component';

describe('PersonalityResultThumbnailComponent', () => {
  let component: PersonalityResultThumbnailComponent;
  let fixture: ComponentFixture<PersonalityResultThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalityResultThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalityResultThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
