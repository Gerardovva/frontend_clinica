import { LocalStorageService } from './../../../components/services/localstorage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class ApiService {

    private readonly url: string = environment.url;
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


}
