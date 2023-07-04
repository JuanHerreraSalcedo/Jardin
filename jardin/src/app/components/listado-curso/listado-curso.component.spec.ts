import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCursoComponent } from './listado-curso.component';

describe('ListadoCursoComponent', () => {
  let component: ListadoCursoComponent;
  let fixture: ComponentFixture<ListadoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
