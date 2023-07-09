import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
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
    events: []
  };

  eventsPromise!: Observable<EventInput[]>;
  nuevoEvento: any = {};

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.eventsPromise = this.cargarEventos();
  }

  cargarEventos(): Observable<EventInput[]> {
    return this.firestore.collection('eventos').valueChanges()
      .pipe(map((eventos: any[]) => {
        return eventos.map(evento => ({
          title: evento.titulo,
          start: new Date(evento.fechaInicio),
          end: new Date(evento.fechaFin)
        }));
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
