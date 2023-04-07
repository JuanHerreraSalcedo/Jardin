import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { IniciarSesionComponent } from './login/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './login/registro/registro.component';
import { InstitucionalComponent } from './components/pages/institucional/institucional.component';
import { CursosComponent } from './components/pages/cursos/cursos.component';
import { ContactoComponent } from './components/pages/contactanos/contacto/contacto.component';

// modal
import { MisionComponent } from './modal/mision/mision.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'iniciar-sesion', component: IniciarSesionComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'institucional', component: InstitucionalComponent},
  {path: 'cursos', component: CursosComponent},
  {path: 'contacto', component:ContactoComponent},


  {path: 'mision', component: MisionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
