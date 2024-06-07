import { Injectable } from "@angular/core";
import { Observable, Subject, timer } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { ValorReloj } from "../interface/fecha.interface";


@Injectable({
    providedIn: 'root'
})
export class FechaService {
    // Observable para emitir la hora actual periódicamente
    clock: Observable<Date>;
    // Subject para transmitir la información de fecha y hora
    infoFecha$ = new Subject<ValorReloj>();

    constructor() {
        // Inicializa el observable del reloj para emitir la hora actual periódicamente
        this.clock = timer(0, 1000).pipe(map(() => new Date()), shareReplay(1));
    }

    /**
     * Obtiene un Observable que emite la información actualizada del reloj.
     * @returns Un Observable que emite un objeto de tipo ValorReloj que contiene la hora actualizada, los minutos, el período (AM/PM),
     * el día del mes y del año, y el día de la semana.
     */
    getInfoReloj(): Observable<ValorReloj> {
        this.clock.subscribe(time => {
            const valorReloj: ValorReloj = this.obtenerValorReloj(time);
            this.infoFecha$.next(valorReloj);
        });
        return this.infoFecha$.asObservable();
    }

    /**
 * Convierte una fecha en formato ISO 8601 a una cadena de texto con el formato "DD DE Mes DEL AÑO".
 * @param isoDate La fecha en formato ISO 8601.
 * @returns Una cadena de texto con el formato "DD DE Mes DEL AÑO".
 */
    obtenerFechaEnFormatoLargo(isoDate: string): string {
        // Verifica si la fecha proporcionada es válida
        if (!isoDate) return '';

        // Array de nombres de meses en español
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        // Divide la cadena de fecha y hora en dos partes: fecha y hora
        const partesDeFecha = isoDate.split('T');

        // Divide la fecha en partes: año, mes y día
        const [año, mes, dia] = partesDeFecha[0].split('-');

        // Crea un objeto Date con la fecha obtenida
        const fecha = new Date(parseInt(año), parseInt(mes) - 1, parseInt(dia));

        // Formatea el día, asegurándose de que tenga dos dígitos si es necesario
        const diaFormatted = (fecha.getDate() < 10) ? '0' + fecha.getDate() : fecha.getDate().toString();

        // Construye la cadena de texto con el formato requerido
        return `${diaFormatted} DE ${meses[fecha.getMonth()]} DEL ${fecha.getFullYear()}`;
    }


    /**
 * Convierte una fecha en formato ISO 8601 a una cadena de texto con el formato "YYYY-MM-DD".
 * @param isoDate La fecha en formato ISO 8601.
 * @returns Una cadena de texto con el formato "YYYY-MM-DD".
 */
    obtenerFechaEnFormatoCorto(isoDate: string): string {
        // Verifica si la fecha proporcionada es válida
        if (!isoDate) return '';

        // Divide la cadena de fecha y hora en dos partes: fecha y hora
        const partesDeFecha = isoDate.split('T');

        // Divide la fecha en partes: año, mes y día
        const [año, mes, dia] = partesDeFecha[0].split('-');

        // Crea un objeto Date con la fecha obtenida
        const fecha = new Date(parseInt(año), parseInt(mes) - 1, parseInt(dia));

        // Formatea el día, asegurándose de que tenga dos dígitos si es necesario
        const diaFormatted = (fecha.getDate() < 10) ? '0' + fecha.getDate() : fecha.getDate().toString();

        // Formatea el mes, asegurándose de que tenga dos dígitos si es necesario
        const mesFormatted = ((fecha.getMonth() + 1) < 10) ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1).toString();

        // Construye la cadena de texto con el formato requerido
        return `${año}-${mesFormatted}-${diaFormatted}`;
    }

    /**
  * Construye un objeto ValorReloj a partir de una fecha.
  * @param time La fecha de la que se construirá el objeto ValorReloj.
  * @returns Un objeto ValorReloj que contiene la hora, los minutos, el período (AM/PM),
  * el día del mes y del año, y el día de la semana.
  */
    private obtenerValorReloj(time: Date): ValorReloj {
        // Obtiene las horas en formato de 12 horas
        const hours = time.getHours() % 12 || 12;

        // Obtiene los minutos, asegurándose de que tenga dos dígitos si es necesario
        const minutos = (time.getMinutes() < 10) ? '0' + time.getMinutes() : time.getMinutes().toString();

        // Determina si es AM o PM basado en las horas
        const ampm = time.getHours() > 11 ? 'PM' : 'AM';

        // Obtiene el día y el mes en formato de día y mes con dos dígitos y año
        const diaymes = time.toLocaleString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' }).replace('.', '').replace('-', ' ');

        // Obtiene el día de la semana
        const diadesemana = time.toLocaleString('es-MX', { weekday: 'long' }).replace('.', '');

        // Obtiene el año
        const anio = time.getFullYear();

        // Retorna un objeto ValorReloj con la información obtenida
        return { hora: hours, minutos, ampm, diaymes, diadesemana, anio };
    }




    

}
