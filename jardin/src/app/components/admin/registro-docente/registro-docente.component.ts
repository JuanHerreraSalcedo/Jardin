import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro-docente',
  templateUrl: './registro-docente.component.html',
  styleUrls: ['./registro-docente.component.scss']
})
export class RegistroDocenteComponent implements OnInit {
  @ViewChild('tempButton') buttontemp: any;
  title = 'Crud docentes';

  courseOptions = [
    { value: 'Párvulos', label: 'Párvulos' },
    { value: 'Transición', label: 'Transición' },
    { value: 'Prejardín', label: 'Prejardín' },
    { value: 'Jardín', label: 'Jardín' },
  ];

  registrarUsuario: FormGroup;
  docente: any[] = [];
  docenteToDisplay: any[] = [];

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private router: Router,
    private authService: AuthService
  ) {
    this.registrarUsuario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
      repetirContraseña: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      curso: ['', Validators.required],
      fotoPerfil: [null],
      escuela: ['', Validators.required],
      años: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.firestore.collection('usuarios', ref => ref.where('rol', '==', 'docente'))
      .valueChanges()
      .subscribe((data: any) => {
        this.docente = data;
        this.docenteToDisplay = data;
      });
  }

  ngAfterViewInit(): void {
    if (this.buttontemp) {
      this.buttontemp.nativeElement.click();
    }
  }

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
      const curso = this.mapCursoValue(this.registrarUsuario.value.curso);
      const fotoPerfil = this.registrarUsuario.value.fotoPerfil;
      const escuela = this.registrarUsuario.value.escuela;
      const años = this.registrarUsuario.value.años;
      const salario = this.registrarUsuario.value.salario;

      if (contraseña !== repetirContraseña) {
        Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        return;
      }

      try {
        await this.firestore.collection('usuarios').add({
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
          años: años,
          salario: salario
        });

        console.log('Datos guardados en Firestore');
        Swal.fire({
          title: 'Usuario creado',
          text: 'El usuario ha sido registrado exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.registrarUsuario.reset();
        });
      } catch (error) {
        console.error('Error al crear el usuario: ', error);
        Swal.fire('Error', 'Ocurrió un error al crear el usuario', 'error');
      }
    }
  }

  mapCursoValue(value: string): string {
    const cursoOption = this.courseOptions.find((option) => option.value === value);
    return cursoOption ? cursoOption.label : '';
  }
}
