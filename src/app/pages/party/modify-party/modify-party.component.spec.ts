import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPartyComponent } from './modify-party.component';

describe('ModifyPartyComponent', () => {
  let component: ModifyPartyComponent;
  let fixture: ComponentFixture<ModifyPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyPartyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
