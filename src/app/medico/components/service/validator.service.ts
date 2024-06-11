
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })

export class ValidatorsService {


    // Expresiones regulares para validar el formato del nombre y apellido, y el correo electrónico
    /**
     * Patrón de expresión regular para validar el formato de nombres y apellidos.
     * Este patrón permite nombres y apellidos que consisten solo en letras mayúsculas y minúsculas.
     */
    public nombreApellido: string = '([a-zA-Z]+) ([a-zA-Z]+)';

    /**
     * Patrón de expresión regular para validar el formato de direcciones de correo electrónico.
     * Este patrón sigue el estándar para direcciones de correo electrónico y verifica que el formato sea válido.
     */
    public email: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


    public isValidField(form: FormGroup, field: string) {
        // Comprueba si el campo tiene errores y ha sido tocado
        return form.controls[field].errors && form.controls[field].touched;
    }



}