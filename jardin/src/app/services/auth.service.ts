import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  // Obtener el rol del usuario actual
  getUserRole(): Observable<string> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs
            .collection('usuarios')
            .doc(user.uid)
            .valueChanges()
            .pipe(
              map((userData: any) => {
                return userData?.rol || '';
              })
            );
        } else {
          return of('');
        }
      })
    );
  }

  // Obtener el nombre del usuario actual
  getUserName(): Observable<string> {
    return from(this.afAuth.currentUser).pipe(
      switchMap((user) => {
        if (user) {
          return this.afs
            .collection('usuarios')
            .doc(user.uid)
            .get()
            .pipe(
              map((doc) => {
                const userData = doc.data() as { nombre?: string };
                return userData?.nombre || '';
              })
            );
        } else {
          return of('');
        }
      })
    );
  }

  // Cerrar sesión
  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
