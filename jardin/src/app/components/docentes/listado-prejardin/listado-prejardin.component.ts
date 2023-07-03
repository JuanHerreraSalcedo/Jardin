import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-listado-prejardin',
  templateUrl: './listado-prejardin.component.html',
  styleUrls: ['./listado-prejardin.component.scss']
})

export class ListadoPrejardinComponent implements OnInit {
  estudiantes!: any[];
  buscarEstudiante: string = '';

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.firestore
      .collection('estudiantes', (ref) => ref.where('curso', '==', 'prejardin'))
      .valueChanges()
      .subscribe((estudiantes) => {
        this.estudiantes = estudiantes;
        this.sortEstudiantesAlfabeticamente(); // Ordenar estudiantes alfabéticamente
        this.filtrarEstudiantes(); // Filtrar estudiantes según criterio de búsqueda
      });
  }

  filtrarEstudiantes(): void {
    if (this.buscarEstudiante.trim() !== '') {
      const criterio = this.buscarEstudiante.toLowerCase().trim();
      this.estudiantes = this.estudiantes.filter((estudiante) => {
        const nombreCompleto = `${estudiante.nombres} ${estudiante.apellidos}`.toLowerCase();
        return nombreCompleto.includes(criterio);
      });
    } else {
      // Restablecer la lista completa de estudiantes
      this.firestore
        .collection('estudiantes', (ref) => ref.where('curso', '==', 'prejardin'))
        .valueChanges()
        .subscribe((estudiantes) => {
          this.estudiantes = estudiantes;
          this.sortEstudiantesAlfabeticamente(); // Ordenar estudiantes alfabéticamente
        });
    }
  }

  getFotoUrl(fotoPath: string): Observable<string | null> {
    const ref = this.storage.ref(fotoPath);
    return ref.getDownloadURL();
  }

  descargarLista(): void {
    // Crear el libro de Excel
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Crear la hoja de Excel y agregar los datos
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.estudiantes);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Estudiantes');

    // Generar el archivo Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

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
}
