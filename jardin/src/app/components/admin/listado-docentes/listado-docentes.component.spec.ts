import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDocentesComponent } from './listado-docentes.component';

describe('ListadoDocentesComponent', () => {
  let component: ListadoDocentesComponent;
  let fixture: ComponentFixture<ListadoDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoDocentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
