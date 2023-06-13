import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/pages/home/home.component';
import { IniciarSesionComponent } from './login/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './login/registro/registro.component';
import { PasswordComponent } from './login/password/password.component';
import { InstitucionalComponent } from './components/pages/institucional/institucional.component';
import { CursosComponent } from './components/pages/cursos/cursos.component';
import { ContactoComponent } from './components/pages/contactanos/contacto/contacto.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
// modal
import { MisionComponent } from './modal/mision/mision.component';
import { NosotrosComponent } from './components/pages/nosotros/nosotros.component';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: IniciarSesionComponent},
  {path: 'iniciar-sesion', component: IniciarSesionComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'institucional', component: InstitucionalComponent},
  {path: 'cursos', component: CursosComponent},
  {path: 'nosotros', component:NosotrosComponent},
  {path: 'contacto', component:ContactoComponent},
  {path: 'password', component: PasswordComponent},
  { path: 'dashboard', component: DashboardComponent},
  
  {path: 'mision', component: MisionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
