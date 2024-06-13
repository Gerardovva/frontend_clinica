import { LocalStorageService } from './../../../components/services/localstorage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private readonly url: string = environment.medico.url;
  private readonly JWTtoken: string = "JWTtoken";
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,

  ) { }

  registroMedico(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.url}/medicos`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
        }
      }
    );
  }


  listarMedico(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.url}/medicos?page=${page}&size=${pageSize}`, {
      headers: {
        'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
      }
    });
  }

  actualizarMedico(medicoData: any): Observable<any> {
    return this.http.put<any>(`${this.url}/medicos`, medicoData, {
      headers: {
        'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
      }
    });
  }


  eliminarMedico(id: any): Observable<any> {
    return this.http.delete<any>(`${this.url}/medicos/${id}`, { 
      headers: { 'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}` }
     });
  }






}//cierre clase
