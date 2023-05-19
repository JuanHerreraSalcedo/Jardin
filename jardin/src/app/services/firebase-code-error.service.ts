import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }
  firebaseError(code: string) {
    switch (code) {
      //el correo ya esta en uso
      case 'auth/email-already-in-use':
        return 'El usuario que estás registrando ya existe';
      //la contraseña es debil
      case 'auth/weak-password':
        return 'La contraseña es muy débil';
        //correo invalido
      case 'auth/invalid-email':
        return 'El correo es inválido';
      default:
        return 'Error desconocido';
    }
  }
}
