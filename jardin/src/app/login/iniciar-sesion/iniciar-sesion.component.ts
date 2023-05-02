import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IniciarSesionService } from './iniciar-sesion.service';
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

  constructor(private router: Router, private iniciarSesionService: IniciarSesionService) { }

  redirrecionar(){
    this.router.navigate(['/registro'])
  }
  ngOnInit(): void {
  }



objeto:any={

 usuario :'',

 contrasena:''

}



iniciarsesion(objeto:any){
  this.iniciarSesionService.login(objeto).subscribe(result =>{
    console.log(result);
  })
}



}
