import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
    eventColor: '#FF0000', // Cambia el color de las etiquetas a rojo
    locale: esLocale, // Establece el calendario en español
    timeZone: 'local' // Utiliza la zona horaria local del navegador
  };
  

  eventsPromise!: Observable<EventInput[]>;
  nuevoEvento: any = {};

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.eventsPromise = this.cargarEventos();
  }

  cargarEventos(): Observable<EventInput[]> {
    return this.firestore.collection('eventos').snapshotChanges()
      .pipe(map((snapshots: any[]) => {
        return snapshots.map(snapshot => {
          const evento = snapshot.payload.doc.data();
          const fechaInicio = evento.fechaInicio instanceof Date ? evento.fechaInicio : new Date(evento.fechaInicio);
          const fechaFin = evento.fechaFin instanceof Date ? evento.fechaFin : new Date(evento.fechaFin);
          return {
            title: evento.titulo,
            start: fechaInicio,
            end: fechaFin
          };
        });
      }));
  }
  

  handleEventClick(arg: any) {
    // Lógica para manejar el clic en un evento
  }

  guardarEvento(): void {
    this.firestore.collection('eventos').add(this.nuevoEvento)
      .then((docRef) => {
        console.log('Evento guardado con ID:', docRef.id);
        this.nuevoEvento = {};
      })
      .catch((error) => {
        console.error('Error al guardar el evento:', error);
      });
  }
}
