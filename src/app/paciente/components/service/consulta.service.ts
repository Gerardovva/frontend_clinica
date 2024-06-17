import { LocalStorageService } from './../../../components/services/localstorage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private readonly urlBase: string = environment.paciente.uri;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }


  //listar pacientes 
  listarPaciente(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/pacientes?page=${page}&size=${pageSize}`, {
      headers: {
        'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
      }
    });
  }


  //registrar pacientes
  registrarPacientes(payload: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/pacientes`, payload, {
      headers: {
        'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
      }
    })

  }

  //actualizarPacientes
  actualizarPacientes(payload: any): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/pacientes`, payload, {
      headers: {
        'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
      }
    });
  }


  //eliminar pacientes
  eliminarPacientes(id: any): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/pacientes/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
      }
    });

  }


  obtenerPacienteId(id: any): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/pacientes/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
      }
    })
  }

}
