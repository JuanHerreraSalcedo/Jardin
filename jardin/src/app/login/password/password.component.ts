import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  recuperarUsuario: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { 
    this.recuperarUsuario = this.fb.group({
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  recuperar(): void {
    const email = this.recuperarUsuario.value.email;

    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        Swal.fire('Éxito', 'Se te envió un correo para restablecer la contraseña', 'success');
        this.router.navigate(['/iniciar-sesion']);
      })
      .catch((error) => {
        this.loading = false;
        if (error.code === 'auth/user-not-found') {
          Swal.fire('Error', 'El usuario no se encuentra registrado', 'error');
        }
      });
  }
}
