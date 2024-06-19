import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ValorReloj } from "../../interface/fecha.interface";
import { FechaService } from "../../services/fecha.service";
import { AuthService } from "src/app/auth/service/auths.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  loading = false; // Variable para controlar la visualización del indicador de carga
  datos$!: Observable<ValorReloj>; // Observable para obtener los datos del reloj
  hora!: number; // Hora actual
  minutos!: string; // Minutos actuales
  dia!: string; // Día de la semana actual
  fecha!: string; // Fecha actual
  ampm!: string; // AM/PM actual
  nombre = ''; // Nombre del usuario
  primer_ape = ''; // Primer apellido del usuario
  segundo_ape = ''; // Segundo apellido del usuario
  user: any; // Usuario actual
  color!: string;

  constructor(
   
    private fechaService: FechaService, // Servicio para obtener datos de fecha y hora
    private authService: AuthService, // Servicio de autenticación
   
  ) { }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se inicializa.
   * Suscribe al observable para obtener los datos del reloj y actualiza las variables de la clase
   * con los valores correspondientes. Además, verifica si el usuario está autenticado y obtiene
   * su perfil si es necesario.
   */
  ngOnInit(): void {
    // Suscripción al observable para obtener datos del reloj
    this.datos$ = this.fechaService.getInfoReloj();
    this.datos$.subscribe((valorReloj: ValorReloj) => {
      // Actualización de las variables con los valores del reloj
      this.hora = valorReloj.hora;
      this.minutos = valorReloj.minutos;
      this.dia = valorReloj.diadesemana.toUpperCase();
      this.fecha = valorReloj.diaymes.toUpperCase();
      this.ampm = valorReloj.ampm;
    });

   
  }
  changeColor() {
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    this.color = color;
  }

}
