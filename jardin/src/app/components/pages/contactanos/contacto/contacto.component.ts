import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent {
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';

  constructor() {}

  onSubmit() {
    // Construye el cuerpo del correo
    const body = `Nombre: ${this.name}\nEmail: ${this.email}\nAsunto: ${this.subject}\nMensaje: ${this.message}`;

    // Abre el cliente de correo con los campos predefinidos
    window.open(`mailto:avilajuanpablo1417@gmail.com?subject=${encodeURIComponent(this.subject)}&body=${encodeURIComponent(body)}`);
  }
}
