import { Component } from '@angular/core';
import { ApiService } from 'src/app/medico/components/service/consultas.service';
import { ConsultaCitasservices } from '../../service/consultaapi.service';

@Component({
  selector: 'app-cancelar-citas',
  templateUrl: './cancelar-citas.component.html',
  styleUrls: ['./cancelar-citas.component.css']
})
export class CancelarCitasComponent {

  idPaciente = '1';
  idMedico = '1';
  fechaSeleccionada!: string; // Variable para almacenar la fecha seleccionada por el usuario
  horaSeleccionada!: string; // Variable para almacenar la hora seleccionada por el usuario

  constructor(
    private citas: ConsultaCitasservices,
    private apiService: ApiService) { }

  enviarDatos(): void {
    // Combinar fecha y hora en un solo objeto tipo Date
    const fechaHora = new Date(this.fechaSeleccionada + 'T' + this.horaSeleccionada);

    // Convertir a formato ISO para enviar al servidor
    const fechaHoraISO = fechaHora.toISOString();

    // Crear objeto para enviar al servicio API
    const datos = {
      idPaciente: this.idPaciente,
      idMedico: this.idMedico,
      fecha: fechaHoraISO
    };

    // Llamar al servicio API para enviar los datos
    this.citas.agendarCita(datos)
      .subscribe(response => {
        console.log('Datos enviados correctamente:', response);
      }, error => {
        console.error('Error al enviar datos:', error);
      });
  }

}
