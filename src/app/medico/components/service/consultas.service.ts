import { LocalStorageService } from './../../../components/services/localstorage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { MedicoI } from '../interface/medico.interface';
import { MedicoCuerpoI, MedicoRegitroI } from '../interface/medico-registro.interface';
import { MedicoActualizarI } from '../interface/medico-actualizar.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private readonly urlBase: string = environment.medico.url;
  private readonly JWTtoken: string = "JWTtoken";
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,

  ) { }

  //Metodo para crear medico
  registroMedico(data: MedicoCuerpoI): Observable<MedicoRegitroI> {
    return this.http.post<MedicoRegitroI>(
      `${this.urlBase}/medicos`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
        }
      }
    );
  }

  //método para listar medico
  listarMedico(page: number, pageSize: number): Observable<MedicoI> {
    return this.http.get<MedicoI>(`${this.urlBase}/medicos?page=${page}&size=${pageSize}`, {
      headers: {
        'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
      }
    });
  }

  //método para actualizar medico
  actualizarMedico(medicoData: MedicoActualizarI): Observable<MedicoActualizarI> {
    return this.http.put<MedicoActualizarI>(`${this.urlBase}/medicos`, medicoData, {
      headers: {
        'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
      }
    });
  }


  //método para elimiar médico
  eliminarMedico(id: number): Observable<number> {
    return this.http.delete<number>(`${this.urlBase}/medicos/${id}`, {
      headers: { 'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}` }
    });
  }


  //metodo para obtener medico por el id y todos sus datos
  obtenerMedicoId(id: any): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/medicos/${id}`, {
      headers: {
        'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
      }
    })
  }


}//cierre clase
