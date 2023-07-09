import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FirebaseCodeErrorService } from './services/firebase-code-error.service';
import { AuthService } from './services/auth.service';


import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { InstitucionalComponent } from './components/pages/institucional/institucional.component';
import { BannerHomeComponent } from './components/modules/banner-home/banner-home.component';
import { BannerInstitucionalComponent } from './components/modules/banner-institucional/banner-institucional.component';
import { IniciarSesionComponent } from './login/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './login/registro/registro.component';
import { MisionComponent } from './modal/mision/mision.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { CursosComponent } from './components/pages/cursos/cursos.component';
import { VisionComponent } from './modal/vision/vision.component';
import { MapaComponent } from './components/pages/contactanos/mapa/mapa.component';
import { ContactoComponent } from './components/pages/contactanos/contacto/contacto.component';
import { environment } from 'src/environments/environment';
import { NosotrosComponent } from './components/pages/nosotros/nosotros.component';
import { PasswordComponent } from './login/password/password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { PanelAcudienteComponent } from './components/pages/panel-acudiente/panel-acudiente.component';
import { PanelDocenteComponent } from './components/pages/panel-docente/panel-docente.component';
import { RegistroAlumnoComponent } from './components/admin/registro-alumno/registro-alumno.component';
import { RegistroDocenteComponent } from './components/admin/registro-docente/registro-docente.component';
import { ListadoDocentesComponent } from './components/admin/listado-docentes/listado-docentes.component';
import { CorreosComponent } from './components/pages/correos/correos.component';
import { ListadoParvulosComponent } from './components/docentes/listado-parvulos/listado-parvulos.component';
import { ListadoTransicionComponent } from './components/docentes/listado-transicion/listado-transicion.component';
import { ListadoPrejardinComponent } from './components/docentes/listado-prejardin/listado-prejardin.component';
import { ListadoJardinComponent } from './components/docentes/listado-jardin/listado-jardin.component';
import { ListadoCursoComponent } from './components/listado-curso/listado-curso.component';

//calendario  
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarioComponent } from './components/calendario/calendario.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    InstitucionalComponent,
    BannerHomeComponent,
    BannerInstitucionalComponent,
    IniciarSesionComponent,
    RegistroComponent,
    MisionComponent,
    WhatsappComponent,
    CursosComponent,
    VisionComponent,
    MapaComponent,
    ContactoComponent,
    NosotrosComponent,
    PasswordComponent,
    SpinnerComponent,
    DashboardComponent,
    PanelAcudienteComponent,
    PanelDocenteComponent,
    RegistroAlumnoComponent,
    RegistroDocenteComponent,
    ListadoDocentesComponent,
    CorreosComponent,
    ListadoParvulosComponent,
    ListadoTransicionComponent,
    ListadoPrejardinComponent,
    ListadoJardinComponent,
    ListadoCursoComponent,
    CalendarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    FirebaseCodeErrorService,
        AuthService, // Agrega el servicio aquí

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
