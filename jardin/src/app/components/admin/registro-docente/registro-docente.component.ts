import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('tempButton') buttontemp: any;
  title = 'Crud docentes';

  courseOptions = [
    'Parvulos',
    'Transición',
    'Prejardín',
    'Jardín',
  ];

  registrarUsuario: FormGroup;

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
      rol: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      curso: ['', Validators.required], // Agregado el campo 'curso' al formulario
      fotoPerfil: [null],
      escuela: ['', Validators.required],
      años: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.buttontemp) {
      this.buttontemp.nativeElement.click();
    }
  }

  registrar() {
    if (this.registrarUsuario.valid) {
      const nombre = this.registrarUsuario.value.nombre;
      const apellido = this.registrarUsuario.value.apellido;
      const correo = this.registrarUsuario.value.correo;
      const contraseña = this.registrarUsuario.value.contraseña;
      const repetirContraseña = this.registrarUsuario.value.repetirContraseña;
      const rol = this.registrarUsuario.value.rol;
      const fechaNacimiento = this.registrarUsuario.value.fechaNacimiento;
      const genero = this.registrarUsuario.value.genero;
      const curso = this.registrarUsuario.value.curso; // Obtener el valor de 'curso'
      const fotoPerfil = this.registrarUsuario.value.fotoPerfil;
      const escuela = this.registrarUsuario.value.escuela;
      const años = this.registrarUsuario.value.años;
      const salario = this.registrarUsuario.value.salario;

      if (contraseña !== repetirContraseña) {
        Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        return;
      }

      this.afAuth.createUserWithEmailAndPassword(correo, contraseña)
        .then((userCredential) => {
          const userId = userCredential.user?.uid;

          this.firestore.collection('usuarios').doc(userId).set({
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            contraseña: contraseña,
            repetirContraseña: repetirContraseña,
            rol: rol,
            fechaNacimiento: fechaNacimiento,
            genero: genero,
            curso: curso, // Agregar el campo 'curso' al documento
            fotoPerfil: fotoPerfil,
            escuela: escuela,
            años: años,
            salario: salario
          })
          .then(() => {
            console.log('Datos guardados en Firestore');
            Swal.fire({
              title: 'Usuario creado',
              text: 'El usuario ha sido registrado exitosamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.router.navigate(['/lista-docentes']);
            });
          })
          .catch((error) => {
            console.error('Error al guardar los datos en Firestore: ', error);
            Swal.fire('Error', 'Ocurrió un error al crear el usuario', 'error');
          });
        })
        .catch((error) => {
          console.error('Error al crear el usuario: ', error);
          Swal.fire('Error', 'Ocurrió un error al crear el usuario', 'error');
        });
    }
  }
}
