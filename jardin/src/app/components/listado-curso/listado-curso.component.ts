import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-listado-curso',
  templateUrl: './listado-curso.component.html',
  styleUrls: ['./listado-curso.component.scss']
})
export class ListadoCursoComponent implements OnInit {
  estudiantes: any[] = [];
  estudiantesPaginados: any[] = [];
  buscarEstudiante: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 15; // Actualiza el número máximo de registros por página
  cursoDocente: string = ''; // Variable para almacenar el curso del docente
  estudianteSeleccionado: any = null; // Variable para almacenar el estudiante seleccionado

  desempenio: string = '';
  comportamiento: string = '';
  participacion: string = '';
  creatividad: string = '';
  asistencia: string = '';
  comio: string = '';
  observaciones: string = '';
  fechaReporte: string = '';

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.obtenerCursoDocente();
  }

  obtenerCursoDocente(): void {
    this.auth.authState.subscribe((user) => {
      if (user) {
        const correoDocente = user.email; // Obtener el correo del docente autenticado
        this.firestore
          .collection('usuarios', (ref) => ref.where('correo', '==', correoDocente).limit(1))
          .valueChanges()
          .subscribe((usuarios: any[]) => {
            if (usuarios && usuarios.length > 0) {
              const docente = usuarios[0];
              this.cursoDocente = docente.curso; // Asignar el valor del campo "curso" a la variable "cursoDocente"
              console.log('Curso del docente:', this.cursoDocente); // Agrega esta línea
              this.obtenerEstudiantes();
            } else {
              console.log('No se encontró el docente');
              // Manejar el caso si no se encuentra el docente
            }
          });
      }
    });
  }

  obtenerEstudiantes(): void {
    this.firestore
      .collection('estudiantes', (ref) => ref.where('curso', '==', this.cursoDocente))
      .valueChanges()
      .subscribe((estudiantes) => {
        this.estudiantes = estudiantes;
        this.sortEstudiantesAlfabeticamente(); // Ordenar estudiantes alfabéticamente
        this.paginarEstudiantes(); // Paginar estudiantes
      });
  }

  filtrarEstudiantes(): void {
    this.currentPage = 1; // Reiniciar la página actual al realizar una búsqueda

    if (this.buscarEstudiante.trim() !== '') {
      const criterio = this.buscarEstudiante.toLowerCase().trim();
      this.estudiantes = this.estudiantes.filter((estudiante) => {
        const nombreCompleto = `${estudiante.nombres} ${estudiante.apellidos}`.toLowerCase();
        return nombreCompleto.includes(criterio);
      });
    } else {
      this.obtenerEstudiantes(); // Restablecer la lista completa de estudiantes
    }

    this.paginarEstudiantes(); // Actualizar estudiantes paginados después de filtrar
  }

  paginarEstudiantes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.estudiantesPaginados = this.estudiantes.slice(startIndex, endIndex);
  }

  cambiarPagina(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.paginarEstudiantes();
  }

  descargarLista(): void {
    // Crear el libro de Excel
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Crear la hoja de Excel y agregar los datos
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.estudiantes);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Estudiantes');

    // Generar el archivo Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });

    // Descargar el archivo Excel
    saveAs(data, 'lista_estudiantes.xlsx');
  }

  sortEstudiantesAlfabeticamente() {
    this.estudiantes.sort((a, b) => {
      const apellidosA = a.apellidos.toLowerCase();
      const apellidosB = b.apellidos.toLowerCase();
      if (apellidosA < apellidosB) {
        return -1;
      }
      if (apellidosA > apellidosB) {
        return 1;
      }
      return 0;
    });
  }

  getTotalPages(): number[] {
    return Array(Math.ceil(this.estudiantes.length / this.itemsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  seleccionarEstudiante(estudiante: any) {
    this.estudianteSeleccionado = estudiante;
  }

  registrarReporte() {
    // Verificar si el usuario está autenticado
    this.auth.authState.subscribe((user) => {
      if (user) {
        // Utilizar los datos del estudiante seleccionado y otros valores del formulario para guardar el reporte
        const reporte = {
          estudianteId: this.estudianteSeleccionado.id, // Agregar el ID del estudiante correspondiente
          desempenio: this.desempenio, // Agregar el valor de los radio buttons y otros campos del formulario
          comportamiento: this.comportamiento,
          participacion: this.participacion,
          creatividad: this.creatividad,
          asistencia: this.asistencia,
          comio: this.comio,
          observaciones: this.observaciones,
          fechaReporte: this.fechaReporte,
          usuarioId: user.uid // Agregar el ID del usuario autenticado
        };

        console.log('Datos del estudiante seleccionado:', this.estudianteSeleccionado); // Agrega esta línea
        console.log('Datos del reporte:', reporte); // Agrega esta línea

        // Guardar el reporte en la colección "reportes"
        this.firestore
          .collection('reportes')
          .add(reporte)
          .then(() => {
            console.log('Reporte guardado exitosamente');
            // Aquí puedes agregar lógica adicional si se desea realizar alguna acción después de guardar el reporte
            this.cerrarModal();
          })
          .catch((error) => {
            console.error('Error al guardar el reporte:', error);
            // Manejar el error en caso de fallo al guardar el reporte
          });
      } else {
        console.log('El usuario no está autenticado');
        // Manejar el caso cuando el usuario no está autenticado
      }
    });
  }

  cerrarModal() {
    this.estudianteSeleccionado = null;
    // Restablecer los valores de los radio buttons y otros campos del formulario
    this.desempenio = '';
    this.comportamiento = '';
    this.participacion = '';
    this.creatividad = '';
    this.asistencia = '';
    this.comio = '';
    this.observaciones = '';
    this.fechaReporte = '';
  }
}
