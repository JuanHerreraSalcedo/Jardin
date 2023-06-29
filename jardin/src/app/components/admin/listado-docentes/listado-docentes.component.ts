import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-listado-docentes',
  templateUrl: './listado-docentes.component.html',
  styleUrls: ['./listado-docentes.component.scss']
})
export class ListadoDocentesComponent implements OnInit {
  usuarios: any[];

  constructor(private firestore: AngularFirestore) {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.obtenerDocentes();
  }

  obtenerDocentes(): void {
    this.firestore.collection('usuarios', ref => ref.where('rol', '==', 'docente')).valueChanges().subscribe(
      (docentes: any[]) => {
        this.usuarios = docentes;
      },
      (error) => {
        console.error('Error al obtener los docentes:', error);
      }
    );
  }
}
