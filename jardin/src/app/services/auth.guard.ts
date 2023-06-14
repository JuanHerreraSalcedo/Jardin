import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => {
        if (user) {
          // El usuario está autenticado, puedes permitir el acceso
          return true;
        } else {
          // El usuario no está autenticado, redirige a la página de inicio de sesión
          this.router.navigate(['/iniciar-sesion']);
          return false;
        }
      })
    );
  }
}
