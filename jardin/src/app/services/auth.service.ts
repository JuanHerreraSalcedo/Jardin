import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  getUserRole(): Observable<string> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore
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

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
