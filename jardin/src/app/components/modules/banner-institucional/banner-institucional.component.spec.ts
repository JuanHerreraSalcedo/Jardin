import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerInstitucionalComponent } from './banner-institucional.component';

describe('BannerInstitucionalComponent', () => {
  let component: BannerInstitucionalComponent;
  let fixture: ComponentFixture<BannerInstitucionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerInstitucionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerInstitucionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
