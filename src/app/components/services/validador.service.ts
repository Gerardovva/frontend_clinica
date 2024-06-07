import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class validadorService {
    constructor() { }


    public isValidField(form: FormGroup, field: string) {
        // Comprueba si el campo tiene errores y ha sido tocado
        return form.controls[field].errors && form.controls[field].touched;
    }
    
}