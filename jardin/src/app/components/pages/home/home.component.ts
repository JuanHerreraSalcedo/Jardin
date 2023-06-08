import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    const elements = document.querySelectorAll('.content');
    elements.forEach(element => {
      observer.observe(element);
    });
  }

  mision =() => {
    Swal.fire({
      title: 'Misión',
      text: 'Nuestra misión es preparar a nuestros estudiantes para enfrentar los desafíos del futuro con confianza, autonomía y excelencia académica. Nos esforzamos por brindar una educación de calidad que siente las bases para su éxito personal, académico y social. Valorando la colaboración y el trabajo en equipo entre nuestros educadores, estudiantes y familias.',
    });
  }

  vision =() => {
    Swal.fire({
      title: 'Visión',
      text: 'Aspiramos a ser una comunidad educativa vibrante, donde los valores de respeto, empatía, creatividad y responsabilidad sean fundamentales en la formación de nuestros estudiantes. Comprometiéndonos por crear un ambiente inclusivo, respetuoso y enriquecedor, donde cada niño y niña se sienta valorado, seguro y motivado para alcanzar su máximo potencial.',
    });
  }

  enfoque =() => {
    Swal.fire({
      title: 'Enfoque',
      text: 'Nuestro enfoque educativo en el Jardín Oso Meloso se basa en proporcionar una educación integral y de calidad a través del aprendizaje activo y lúdico. Valoramos el juego como una herramienta fundamental para el desarrollo de nuestros estudiantes, promoviendo la exploración, la creatividad y el descubrimiento. Además, nos enfocamos en el desarrollo socioemocional de los niños y niñas, promoviendo la empatía, el respeto mutuo y la comunicación efectiva. Buscamos crear un ambiente seguro y afectivo donde los estudiantes se sientan valorados y puedan desarrollar habilidades socioemocionales sólidas.',
    });
  }

  fortalezas =() => {
    Swal.fire({
      title: 'Fortalezas',
      html: '<p>Enfoque lúdico: Valoramos el juego como una herramienta fundamental para el aprendizaje y el desarrollo de los niños y niñas. Fomentamos un ambiente lúdico y estimulante que promueve la exploración, la creatividad y el descubrimiento.</p><br><p>Desarrollo socioemocional: Reconocemos la importancia del desarrollo socioemocional en el crecimiento de nuestros estudiantes. Nos enfocamos en cultivar habilidades como la empatía, la comunicación efectiva y la resolución de conflictos, creando un ambiente seguro y afectivo donde los niños y niñas puedan desarrollar relaciones saludables y una sólida autoestima.</p>      <br>'
    });
  }
}
