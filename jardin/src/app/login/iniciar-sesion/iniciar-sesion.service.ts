import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IniciarSesionService {

  constructor(private http: HttpClient) { 
     
  }   
  /*
    headers: any = {
      'Content-Type':'application/json; charset=utf-8',
      "Authorization": "ACCESS TOKEN"
    };
  */

    url ="http://127.0.0.1:8000/api";

    headers: any = {
      'Content-Type':'application/json; charset=utf-8'      
    };
    //Post options pass it to HttpHeaders Class 
    httpOptions = {
        headers: new HttpHeaders(this.headers),
    };
  login(articulo:any){
    console.log("datos a actualizar");
    console.log(articulo);
    // console.log(id);
    // return this.http.patch(`${this.url}`+"/"+ id,JSON.stringify(articulo), this.httpOptions )
    return this.http.post(`${this.url}`+"/"+ "usuario",JSON.stringify(articulo), this.httpOptions )
  }
}