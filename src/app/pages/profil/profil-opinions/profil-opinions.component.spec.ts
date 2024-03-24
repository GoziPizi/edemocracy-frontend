import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilOpinionsComponent } from './profil-opinions.component';

describe('ProfilOpinionsComponent', () => {
  let component: ProfilOpinionsComponent;
  let fixture: ComponentFixture<ProfilOpinionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilOpinionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilOpinionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
