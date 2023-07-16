import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-alumno',
  templateUrl: './registro-alumno.component.html',
  styleUrls: ['./registro-alumno.component.scss']
})
export class RegistroAlumnoComponent implements OnInit {
  registrarEstudiante: FormGroup;
  usuarioId?: string; // Variable para almacenar el ID del usuario registrado
  courseOptions = [
    { value: 'Párvulos', label: 'Párvulos' },
    { value: 'Transición', label: 'Transición' },
    { value: 'Prejardín', label: 'Prejardín' },
    { value: 'Jardín', label: 'Jardín' },
  ];

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.registrarEstudiante = this.fb.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      curso: ['', Validators.required],
      edad: ['', Validators.required],
      carneVacunas: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      ciudad: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  async registrar() {
    if (this.registrarEstudiante.invalid) {
      Swal.fire('Error', 'Por favor, completa todos los campos obligatorios', 'error');
      return;
    }

    const cedula = this.registrarEstudiante.value.cedula;
    const nombres = this.registrarEstudiante.value.nombres;
    const apellidos = this.registrarEstudiante.value.apellidos;
    const curso = this.registrarEstudiante.value.curso;
    const edad = this.registrarEstudiante.value.edad;
    const carneVacunas = this.registrarEstudiante.value.carneVacunas;
    const fechaNacimiento = this.registrarEstudiante.value.fechaNacimiento;
    const direccion = this.registrarEstudiante.value.direccion;
    const telefono = this.registrarEstudiante.value.telefono;
    const ciudad = this.registrarEstudiante.value.ciudad;

    // Obtener el ID del usuario actualmente autenticado
    const user = await this.afAuth.currentUser;
    if (user) {
      this.usuarioId = user.uid;

      // Crear el estudiante en la colección "estudiantes" y vincularlo al usuario
      const estudianteRef = this.firestore.collection('estudiantes').doc();
      const estudianteId = estudianteRef.ref.id; // ID único del estudiante

      await estudianteRef.set({
        id: estudianteId,
        cedula: cedula,
        nombres: nombres,
        apellidos: apellidos,
        curso: curso,
        edad: edad,
        carneVacunas: carneVacunas,
        fechaNacimiento: fechaNacimiento,
        direccion: direccion,
        telefono: telefono,
        ciudad: ciudad
      });

      // Crear una subcolección "acudientes" dentro del documento del estudiante y vincularlo al acudiente
      await estudianteRef.collection('usuarios').doc(this.usuarioId).set({});

      Swal.fire({
        title: 'Éxito',
        text: 'Estudiante registrado exitosamente',
        icon: 'success',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/registro-alumno']); // Reemplaza '/otra-vista' con la ruta a la siguiente vista
        }
      });
    } else {
      Swal.fire('Error', 'No se pudo obtener el usuario actual', 'error');
    }
  }
}
