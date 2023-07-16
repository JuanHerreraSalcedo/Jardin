import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  gallery() {
    Swal.fire({
      imageUrl: '../../../../../../assets/img/jardin3.jpg',
      imageAlt: 'Boat on Calm Water',
    });
  }
  gallery2() {
    Swal.fire({
      imageUrl: '../../../../../../assets/img/jardin6.jpg',
      imageAlt: 'Boat on Calm Water',
    });
  }
  gallery3() {
    Swal.fire({
      imageUrl: '../../../../../../assets/img/Jardin1.jpg',
      imageAlt: 'Boat on Calm Water',
    });
  }
  gallery4() {
    Swal.fire({
      imageUrl: '../../../../../../assets/img/jardin7.jpg',
      imageAlt: 'Boat on Calm Water',
    });
  }
  gallery5() {
    Swal.fire({
      imageUrl: '../../../../../../assets/img/jardin2.jpg',
      imageAlt: 'Boat on Calm Water',
    });
  }
  gallery6() {
    Swal.fire({
      imageUrl: '../../../../../../assets/img/jardin4.jpg',
      imageAlt: 'Boat on Calm Water',
    });
  }
}
