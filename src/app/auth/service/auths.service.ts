import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/components/services/localstorage.service';
import { environment } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class AuthService {
 

  private readonly url = environment.medico.url;
  private readonly JWTtoken: string = "JWTtoken";

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
  ) { }

  autenticacion(payload: any): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, payload).pipe(
      tap(res => {
       // console.log("Respuesta del servidor:", res);
        if (res && res.JWTtoken) { // Cambiado de res.token a res.JWTtoken
          //console.log("Token recibido:", res.JWTtoken); // Cambiado de res.token a res.JWTtoken
          this.guardarToken(res.JWTtoken); // Cambiado de res.token a res.JWTtoken
          //console.log("Token guardado en localStorage");
        } else {
          console.error("No se recibió un token válido del servidor.");
        }
      })
    );
  }
  

  tokenValidation():Observable<boolean> {
    // Verifica si el token JWT está presente en localStorage y si no ha expirado
    const token = localStorage.getItem("JWTtoken");
    // console.log("token de validacion: ",token);
    
    return of(token !== null); // Devuelve true si el token está presente
 }

  private guardarToken(token: string) {
  //  console.log("Guardando token:", token);
    this.localStorage.set(this.JWTtoken, token);
  }
}
