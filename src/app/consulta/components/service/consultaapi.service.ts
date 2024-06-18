import { LocalStorageService } from 'src/app/components/services/localstorage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class ConsultaCitasservices {
    private readonly urlBase: string = environment.consulta.uri;

    constructor(
        private http: HttpClient,
        private localStorage: LocalStorageService
    ) { }

    obtenerConsultas(): Observable<any> {
        return this.http.get<any>(`${this.urlBase}/consultas`, {
            headers: {
                'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
            }
        })
    }

    obtenerConsultaCitas(): Observable<any> {
        return this.http.get<any>(`${this.urlBase}/consultas/citas`, {
            headers: {
                'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
            }
        })
    }


    agendarCita(payload: any): Observable<any> {
        return this.http.post<any>(`${this.urlBase}/consultas`, payload, {
            headers: {
                'Authorization': `Bearer ${this.localStorage.get("JWTtoken")}`
            }
        })
    }
}