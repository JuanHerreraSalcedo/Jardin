import { Component, OnInit } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  mostrarDatosInvisibles = false;
  mostrarDocentesInvisibles = false;
  constructor() { }

  ngOnInit(): void {
  }
  
  parvulos =() =>{
    Swal.fire({
      title: 'Párvulos',
      text: 'Bienvenidos al Jardín Oso Meloso, un lugar lleno de alegría, amor y aprendizaje para nuestros niños. En nuestro curso de parvulos, nos enfocamos en brindar a los niños y niñas un entorno seguro y estimulante, donde puedan explorar y descubrir el mundo que les rodea. Nuestro objetivo es promover su desarrollo integral, potenciando sus habilidades cognitivas, emocionales, sociales y motoras.',
      imageUrl: 'https://crayolasygarabatos.com/wp-content/uploads/2018/02/parvulos.png',
      imageWidth: 300,
      imageHeight: 100,
      imageAlt: 'Custom image',
    });    
  }
  prejardin =() =>{
    Swal.fire({
      title: 'Pre-jardín',
      text: 'En nuestro curso de prejardín, nos enfocamos en brindar a los niños y niñas una base sólida para su desarrollo integral, preparándolos para su transición exitosa al jardín de infantes. Estimulando su curiosidad, promoviendo su autonomía y cultivando un amor por el aprendizaje que los acompañe a lo largo de su vida.',
      imageUrl: 'https://jardininfantilsenderos.com/wp-content/uploads/2020/12/Pre-Jardin-Movil-1024x324.png',
      imageWidth: 300,
      imageHeight: 100,
      imageAlt: 'Custom image',
    })
  }
  jardin =() =>{
    Swal.fire({
      title: 'Jardín',
      text: 'En nuestro Jardín reconocemos la importancia de cultivar el amor por el aprendizaje y la curiosidad intelectual en nuestros niños de Jardín. Promovemos el desarrollo de habilidades de pensamiento crítico, resolución de problemas y comunicación efectiva, preparando a los estudiantes para enfrentar los retos académicos',
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 300,
      imageHeight: 100,
      imageAlt: 'Custom image',
    })
  }
  transicion =() =>{
    Swal.fire({
      title: 'Transición',
      text: 'En nuestro curso de transición, nos enfocamos en brindar a los estudiantes una transición suave y exitosa desde el jardín de infantes hacia la escuela primaria, comprometiéndonos en brindar a los estudiantes una base sólida que los prepare para tener éxito en su próximo nivel educativo. fomentando también el respeto mutuo, la empatía y la colaboración, creando un ambiente inclusivo donde cada estudiante se sienta valorado y respetado.',
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 300,
      imageHeight: 100,
      imageAlt: 'Custom image',
    })
  }
  mostrarDatos() {
    this.mostrarDatosInvisibles = !this.mostrarDatosInvisibles;
    if (this.mostrarDatosInvisibles) {
      this.mostrarDocentesInvisibles = false; // Cerrar el otro panel si está abierto
    }
  }
  
  mostrarDocentes() {
    this.mostrarDocentesInvisibles = !this.mostrarDocentesInvisibles;
    if (this.mostrarDocentesInvisibles) {
      this.mostrarDatosInvisibles = false; // Cerrar el otro panel si está abierto
    }
  }
  
}
