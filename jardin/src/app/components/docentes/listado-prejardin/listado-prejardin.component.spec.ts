import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPrejardinComponent } from './listado-prejardin.component';

describe('ListadoPrejardinComponent', () => {
  let component: ListadoPrejardinComponent;
  let fixture: ComponentFixture<ListadoPrejardinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPrejardinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPrejardinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
