import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTransicionComponent } from './listado-transicion.component';

describe('ListadoTransicionComponent', () => {
  let component: ListadoTransicionComponent;
  let fixture: ComponentFixture<ListadoTransicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoTransicionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTransicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
