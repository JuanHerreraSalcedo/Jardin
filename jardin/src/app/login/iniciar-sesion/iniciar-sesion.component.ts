import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {
  loginUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginUsuario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  login() {
    const correo = this.loginUsuario.value.correo;
    const contraseña = this.loginUsuario.value.contraseña;

    if (this.loginUsuario.invalid) {
      Swal.fire('Error', 'Por favor, ingresa un correo electrónico válido y una contraseña', 'error');
      return;
    }
    this.loading = true;

    this.afAuth.signInWithEmailAndPassword(correo, contraseña)
    .then((user) => {
      console.log(user, contraseña);
      this.authService.getUserRole().subscribe((rol: string) => {
        if (rol === 'docente') {
          this.router.navigate(['/panel-docente']);
        } else if (rol === 'acudiente') {
          this.router.navigate(['/panelAcudiente']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
    })
    // ...
  
    // ...
  
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          Swal.fire('Error', 'El correo electrónico ingresado no es válido', 'error');
        } else if (error.code === 'auth/wrong-password') {
          Swal.fire('Error', 'La contraseña ingresada es incorrecta', 'error');
        } else if (error.code === 'auth/user-not-found') {
          Swal.fire('Error', 'El usuario no está registrado', 'error');
        } else {
          Swal.fire('Error', 'Ha ocurrido un error al iniciar sesión', 'error');
        }
        this.loading = false;
      });
  }
}
