import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    CursosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
