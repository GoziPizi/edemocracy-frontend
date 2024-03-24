import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPersonalsComponent } from './profil-personals.component';

describe('ProfilPersonalsComponent', () => {
  let component: ProfilPersonalsComponent;
  let fixture: ComponentFixture<ProfilPersonalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilPersonalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilPersonalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
