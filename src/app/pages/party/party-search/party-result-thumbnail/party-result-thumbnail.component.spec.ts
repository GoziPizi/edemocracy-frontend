import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyResultThumbnailComponent } from './party-result-thumbnail.component';

describe('PartyResultThumbnailComponent', () => {
  let component: PartyResultThumbnailComponent;
  let fixture: ComponentFixture<PartyResultThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartyResultThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartyResultThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
