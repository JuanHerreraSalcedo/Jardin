import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoJardinComponent } from './listado-jardin.component';

describe('ListadoJardinComponent', () => {
  let component: ListadoJardinComponent;
  let fixture: ComponentFixture<ListadoJardinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoJardinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoJardinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
