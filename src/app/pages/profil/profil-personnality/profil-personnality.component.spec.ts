import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPersonnalityComponent } from './profil-personnality.component';

describe('ProfilPersonnalityComponent', () => {
  let component: ProfilPersonnalityComponent;
  let fixture: ComponentFixture<ProfilPersonnalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilPersonnalityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilPersonnalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
