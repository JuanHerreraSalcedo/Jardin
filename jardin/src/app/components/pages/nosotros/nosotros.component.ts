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
      imageUrl: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
      imageAlt: 'Boat on Calm Water',
    });
  }
}
