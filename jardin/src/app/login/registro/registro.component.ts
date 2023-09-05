import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registrarUsuario: FormGroup;
  // loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    // Crear el formulario con validadores
    this.registrarUsuario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
      repetircontraseña: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  registrar() {
    // Obtener los valores del formulario
    const nombre = this.registrarUsuario.value.nombre;
    const apellido = this.registrarUsuario.value.apellido;
    const cedula = this.registrarUsuario.value.cedula;
    const direccion = this.registrarUsuario.value.direccion;
    const correo = this.registrarUsuario.value.correo;
    const contraseña = this.registrarUsuario.value.contraseña;
    const repetircontraseña = this.registrarUsuario.value.repetircontraseña;

    // Imprimir los valores en la consola para verificar
    console.log(nombre, apellido, direccion, correo, contraseña, repetircontraseña);

    // Validar el formulario
    if (this.registrarUsuario.invalid) {
      Swal.fire('Error', 'Por favor, ingresa un correo electrónico válido', 'error');
      return;
    }

    if (contraseña !== repetircontraseña) {
      Swal.fire('Error', 'Las contraseñas no son iguales', 'error');
      return;
    }

    // this.loading = true;
    // Crear el usuario en Firebase Authentication
    this.afAuth.createUserWithEmailAndPassword(correo, contraseña)
      .then((userCredential) => {
        // Obtener el ID del usuario recién registrado
        const userId = userCredential.user?.uid;

        // Guardar los datos en Firestore
        this.firestore.collection('usuarios').doc(userId).set({
          nombre: nombre,
          apellido: apellido,
          cedula: cedula,
          direccion: direccion,
          correo: correo,
          rol: 'Acudiente' // Establecer el rol como "Acudiente" automáticamente
        })
        .then(() => {
          console.log('Datos guardados en Firestore');
          Swal.fire({
            title: 'Éxito',
            text: 'Usuario registrado exitosamente',
            icon: 'success',
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/calendario']);
              // this.loading = false;
            }
          });
        })
        .catch((error) => {
          console.error('Error al guardar los datos en Firestore:', error);
          Swal.fire('Error', 'Ha ocurrido un error al registrar el usuario', 'error');
        });
      })
      .catch((error) => {
        console.error('Error al crear el usuario:', error);
        Swal.fire('Error', this.firebaseError(error.code), 'error');
      });
  }

  firebaseError(code: string) {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El usuario que estás registrando ya existe';
      case 'auth/weak-password':
        return 'La contraseña es muy débil';
      case 'auth/invalid-email':
        return 'El correo es inválido';
      default:
        return 'Error desconocido';
    }
  }
}
