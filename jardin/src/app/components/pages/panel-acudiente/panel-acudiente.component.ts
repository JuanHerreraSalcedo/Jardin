import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-panel-acudiente',
  templateUrl: './panel-acudiente.component.html',
  styleUrls: ['./panel-acudiente.component.scss']
})
export class PanelAcudienteComponent implements OnInit {
  usuarios: any[];

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        this.firestore.collection('usuarios').doc(userId).get()
          .subscribe((docSnapshot) => {
            if (docSnapshot.exists) {
              const userData = docSnapshot.data() as { cedula: string };
              const cedulaEstudiante = userData.cedula;

              this.firestore.collection('estudiantes', ref => ref.where('cedula', '==', cedulaEstudiante))
                .valueChanges().subscribe((estudiantes) => {
                  if (estudiantes.length > 0) {
                    this.usuarios = estudiantes;
                  } else {
                    console.log('No se encontraron datos de los estudiantes');
                  }
                });
            } else {
              console.log('No se encontraron datos del usuario');
            }
          });
      }
    });
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/iniciar-sesion']);
    });
  }
}
