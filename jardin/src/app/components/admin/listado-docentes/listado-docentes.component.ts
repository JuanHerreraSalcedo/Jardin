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
    if (this.usuarios.length === 0) {
      this.obtenerDocentes();
    }
  }

  obtenerDocentes(): void {
    this.firestore.collection('usuarios').ref
      .where('rol', '==', 'docente')
      .get()
      .then((querySnapshot) => {
        const uniqueDocentes: any[] = [];
        querySnapshot.forEach((doc: any) => {
          const docente = { id: doc.id, ...doc.data() };
          if (!uniqueDocentes.some((d) => d.id === docente.id)) {
            uniqueDocentes.push(docente);
          }
        });
        this.usuarios = uniqueDocentes;
      })
      .catch((error) => {
        console.error('Error al obtener los docentes:', error);
      });
  }

  borrarDocente(docenteId: string): void {
    console.log('Borrar docente:', docenteId);
    this.firestore.collection('usuarios').doc(docenteId)
      .delete()
      .then(() => {
        console.log('Docente eliminado correctamente');
        // Actualizar la lista de docentes después de eliminar uno
        this.obtenerDocentes();
      })
      .catch((error) => {
        console.error('Error al borrar el docente:', error);
      });
  }

  editarDocente(docenteId: string): void {
    this.firestore.collection('usuarios').doc(docenteId).get().subscribe((doc: any) => {
      if (doc.exists) {
        const docente = { id: doc.id, ...doc.data() };

        // Mostrar los datos del docente en un formulario de edición
        // Puedes utilizar un modal o cualquier otro componente para el formulario de edición

        // Aquí debes implementar la lógica para abrir el formulario de edición y pasar los datos del docente

        // Una vez que se realicen los cambios en el formulario y se guarden, actualizar los datos en Firestore
        this.firestore.collection('usuarios').doc(docenteId).update(docente)
          .then(() => {
            console.log('Docente actualizado correctamente');
            // Realiza las acciones necesarias después de actualizar el docente
          })
          .catch((error) => {
            console.error('Error al actualizar el docente:', error);
          });
      } else {
        console.log('No se encontró el docente con el ID:', docenteId);
      }
    });
  }
}