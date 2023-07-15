import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-correos',
  templateUrl: './correos.component.html',
  styleUrls: ['./correos.component.scss']
})
export class CorreosComponent implements OnInit {

  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';

  constructor() {}

  ngOnInit(): void {
    // Aquí puedes realizar cualquier lógica de inicialización necesaria
  }

  onSubmit() {
    // Construye el cuerpo del correo
    const body = `Nombre: ${this.name}\nEmail: ${this.email}\nAsunto: ${this.subject}\nMensaje: ${this.message}`;

    // Abre el cliente de correo con los campos predefinidos
    window.open(`mailto:${encodeURIComponent(this.email)}?subject=${encodeURIComponent(this.subject)}&body=${encodeURIComponent(body)}`);
  }

}
