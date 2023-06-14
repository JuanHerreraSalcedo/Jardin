import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-panel-acudiente',
  templateUrl: './panel-acudiente.component.html',
  styleUrls: ['./panel-acudiente.component.scss']
})
export class PanelAcudienteComponent implements OnInit {
  router: any;
  afAuth: any;

  constructor() { }

  ngOnInit(): void {
  }

  
  logout(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/iniciar-sesion']);
    });
  }

}





