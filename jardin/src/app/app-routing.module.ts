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
import { RegistroAlumnoComponent } from './components/admin/registro-alumno/registro-alumno.component';
import { RegistroDocenteComponent } from './components/admin/registro-docente/registro-docente.component';
import { ListadoParvulosComponent } from './components/docentes/listado-parvulos/listado-parvulos.component';
import { ListadoTransicionComponent } from './components/docentes/listado-transicion/listado-transicion.component';
import { ListadoPrejardinComponent } from './components/docentes/listado-prejardin/listado-prejardin.component';
import { ListadoJardinComponent } from './components/docentes/listado-jardin/listado-jardin.component';
import { ListadoCursoComponent } from './components/listado-curso/listado-curso.component';
import { CorreosComponent } from './components/pages/correos/correos.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
// modal
import { MisionComponent } from './modal/mision/mision.component';
import { NosotrosComponent } from './components/pages/nosotros/nosotros.component';
import { PanelAcudienteComponent } from './components/pages/panel-acudiente/panel-acudiente.component';
import { PanelDocenteComponent } from './components/pages/panel-docente/panel-docente.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: IniciarSesionComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'institucional', component: InstitucionalComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'mision', component: MisionComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'registro-alumno', component: RegistroAlumnoComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }  } ,
  { path: 'registro-docente', component: RegistroDocenteComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'parvulos', component: ListadoParvulosComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'transicion', component: ListadoTransicionComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'prejardin', component: ListadoPrejardinComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'jardin', component: ListadoJardinComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'panelAcudiente', component: PanelAcudienteComponent, canActivate: [AuthGuard], data: { roles: ['acudiente'] } },
  { path: 'correos', component: CorreosComponent},
  { path: 'panel-docente', component: PanelDocenteComponent, canActivate: [AuthGuard], data: { roles: ['docente'] } },
  { path: 'listadoCurso', component: ListadoCursoComponent, canActivate: [AuthGuard], data: { roles: ['docente'] } },
  { path: 'calendario', component: CalendarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
