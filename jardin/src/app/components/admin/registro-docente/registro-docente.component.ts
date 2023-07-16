import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-docente',
  templateUrl: './registro-docente.component.html',
  styleUrls: ['./registro-docente.component.scss']
})
export class RegistroDocenteComponent implements OnInit {
  registrarUsuario: FormGroup;

  courseOptions = [
    { value: 'Párvulos', label: 'Párvulos' },
    { value: 'Transición', label: 'Transición' },
    { value: 'Prejardín', label: 'Prejardín' },
    { value: 'Jardín', label: 'Jardín' },
  ];
  
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.registrarUsuario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
      repetirContraseña: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      curso: ['', Validators.required], // Agregado el campo 'curso' al formulario
      fotoPerfil: [null],
      escuela: ['', Validators.required],
      anios: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  async registrar() {
    if (this.registrarUsuario.valid) {
      const nombre = this.registrarUsuario.value.nombre;
      const apellido = this.registrarUsuario.value.apellido;
      const correo = this.registrarUsuario.value.correo;
      const contraseña = this.registrarUsuario.value.contraseña;
      const repetirContraseña = this.registrarUsuario.value.repetirContraseña;
      const rol = 'docente';
      const fechaNacimiento = this.registrarUsuario.value.fechaNacimiento;
      const genero = this.registrarUsuario.value.genero;
      const curso = this.registrarUsuario.value.curso;
      const fotoPerfil = this.registrarUsuario.value.fotoPerfil;
      const escuela = this.registrarUsuario.value.escuela;
      const anios = this.registrarUsuario.value.anios;
      const salario = this.registrarUsuario.value.salario;

      if (contraseña !== repetirContraseña) {
        Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        return;
      }

      try {
        // Crear el usuario en Firebase Authentication
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(correo, contraseña);
        const userId = userCredential.user?.uid;

        // Guardar los datos en Firestore
        await this.firestore.collection('usuarios').doc(userId).set({
          nombre: nombre,
          apellido: apellido,
          correo: correo,
          contraseña: contraseña,
          repetirContraseña: repetirContraseña,
          rol: rol,
          fechaNacimiento: fechaNacimiento,
          genero: genero,
          curso: curso,
          fotoPerfil: fotoPerfil,
          escuela: escuela,
          anios: anios,
          salario: salario
        });

        console.log('Datos guardados en Firestore y usuario registrado en Firebase');
        Swal.fire({
          title: 'Usuario creado',
          text: 'El usuario ha sido registrado exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.registrarUsuario.reset();
        });
      } catch (error: any) { // <- Se añade ": any" para corregir el error
        console.error('Error al crear el usuario: ', error);
        Swal.fire('Error', this.firebaseError(error.code), 'error');
      }
    }
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