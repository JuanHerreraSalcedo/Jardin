import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoParvulosComponent } from './listado-parvulos.component';

describe('ListadoParvulosComponent', () => {
  let component: ListadoParvulosComponent;
  let fixture: ComponentFixture<ListadoParvulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoParvulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoParvulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
