import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-listado-parvulos',
  templateUrl: './listado-parvulos.component.html',
  styleUrls: ['./listado-parvulos.component.scss']
})

export class ListadoParvulosComponent implements OnInit {
  estudiantes: any[] = [];
  estudiantesPaginados: any[] = [];
  buscarEstudiante: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 15;

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.obtenerEstudiantes();
  }

  obtenerEstudiantes(): void {
    this.firestore
      .collection('estudiantes', (ref) => ref.where('curso', '==', 'Párvulos'))
      .valueChanges()
      .subscribe((estudiantes) => {
        this.estudiantes = estudiantes;
        this.sortEstudiantesAlfabeticamente();
        this.paginarEstudiantes();
      });
  }

  filtrarEstudiantes(): void {
    this.currentPage = 1;

    if (this.buscarEstudiante.trim() !== '') {
      const criterio = this.buscarEstudiante.toLowerCase().trim();
      const estudiantesFiltrados = this.estudiantes.filter((estudiante) => {
        const nombreCompleto = `${estudiante.nombres} ${estudiante.apellidos}`.toLowerCase();
        return nombreCompleto.includes(criterio);
      });

      if (estudiantesFiltrados.length > 0) {
        this.estudiantes = estudiantesFiltrados;
      } else {
        // No se encontraron resultados, mantener la lista completa de estudiantes
        this.obtenerEstudiantes();
      }
    } else {
      // Restablecer la lista completa de estudiantes
      this.obtenerEstudiantes();
    }

    this.paginarEstudiantes();
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

  getFotoUrl(fotoPath: string): Observable<string | null> {
    const ref = this.storage.ref(fotoPath);
    return ref.getDownloadURL();
  }

  descargarLista(): void {
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.estudiantes);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Estudiantes');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
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
    return Array(Math.ceil(this.estudiantes.length / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }
}
