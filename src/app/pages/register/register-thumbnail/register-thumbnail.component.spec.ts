import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterThumbnailComponent } from './register-thumbnail.component';

describe('RegisterThumbnailComponent', () => {
  let component: RegisterThumbnailComponent;
  let fixture: ComponentFixture<RegisterThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
