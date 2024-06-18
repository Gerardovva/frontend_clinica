import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ConsultaCitasservices } from '../../service/consultaapi.service';
import { ConsultaService } from 'src/app/paciente/components/service/consulta.service';
import { ApiService } from './../../../../medico/components/service/consultas.service';

@Component({
  selector: 'app-agendar-citas',
  templateUrl: './agendar-citas.component.html',
  styleUrls: ['./agendar-citas.component.css']
})
export class AgendarCitasComponent implements OnInit {

  medicos: any[] = [];
  pacientes: any[] = [];
  totalPagesPaciente: number = 0;
  currentPagePaciente: number = 0;
  totalElementsPaciente: number = 0;
  pageSizePaciente: number = 10;

  totalPagesMedico: number = 0;
  currentPageMedico: number = 0;
  totalElementsMedico: number = 0;
  pageSizeMedico: number = 10;

  formCita: FormGroup;

  constructor(
    private fb: FormBuilder,
    private citaService: ConsultaCitasservices,
    private pacienteService: ConsultaService,
    private medicoService: ApiService,
  ) {
    this.formCita = this.fb.group({
      idPaciente: ['', [Validators.required]],
      idMedico: ['', [Validators.required]],
      fecha: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.listaMedicos(0);
    this.listaPaciente(0);
  }

  listaMedicos(page: number) {
    this.medicoService.listarMedico(page, this.pageSizeMedico).subscribe({
      next: (data: any) => {
        this.medicos = data.content;
        this.totalPagesMedico = data.totalPages;
        this.currentPageMedico = data.number + 1;
        this.totalElementsMedico = data.totalElements;
      },
      error: (error) => {
        console.error("Error al obtener los médicos:", error);
      }
    });
  }

  listaPaciente(page: number) {
    this.pacienteService.listarPaciente(page, this.pageSizePaciente).subscribe({
      next: (response) => {
        this.pacientes = response.content;
        this.totalPagesPaciente = response.totalPages;
        this.currentPagePaciente = response.number + 1;
        this.totalElementsPaciente = response.totalElements;
      },
      error: (error) => {
        console.error("Error al obtener los pacientes:", error);
      }
    });
  }

  agendar() {
    if (this.formCita.valid) {
      const payload = {
        idPaciente: +this.formCita.value.idPaciente,
        idMedico: +this.formCita.value.idMedico,
        fecha: this.formCita.value.fecha
      };
      Swal.fire({
        title: "¿Estás seguro de realizar la cita?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Agendar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.citaService.agendarCita(payload).subscribe({
            next: (response: any) => {
              Swal.fire({
                title: "Registro exitoso!",
                text: "La cita ha sido registrada correctamente.",
                icon: "success"
              });
              this.formCita.reset();
            },
            error: (error: any) => {
              // console.error("Errores al agendar cita:", error);
              if (error.status === 400 && error.error && error.error.length > 0) {
                const firstError = error.error[0];
                if (firstError.campo === "fecha" && firstError.error === "debe ser una fecha futura") {
                  Swal.fire('¡Error!', `Error al agendar la cita: La fecha debe ser una fecha futura.`, 'error');
                } else if (error.error.includes("No se puede permitir agendar citas con médicos inactivos en el sistema")) {
                  Swal.fire('¡Error!', `Error al agendar la cita: No se puede permitir agendar citas con médicos inactivos en el sistema.`, 'error');
                } else if (error.error.includes("No se puede permitir agendar citas con pacientes inactivos en el sistema")) {
                  Swal.fire('¡Error!', `Error al agendar la cita: No se puede permitir agendar citas con pacientes inactivos en el sistema.`, 'error');
                } else if (error.error.includes("el paciente ya tiene una consulta para ese dia")) {
                  Swal.fire('¡Error!', `Error al agendar la cita: El paciente ya tiene una consulta para ese día.`, 'error');
                } else if (error.error.includes("este id para el medico no fue encontrado")) {
                  Swal.fire('¡Error!', `Error al agendar la cita: Este id para el médico no fue encontrado.`, 'error');
                } else if (error.error.includes("este id para el paciente no fue encontrado")) {
                  Swal.fire('¡Error!', `Error al agendar la cita: Este id para el paciente no fue encontrado.`, 'error');
                } else if (error.error.includes("El horario de atención de la clínica es de lunes a sábado, de 07:00 a 19:00 horas")) {
                  Swal.fire('¡Error!', `El horario de atención de la clínica es de lunes a sábado, de 07:00 a 19:00 horas`, 'error');
                }
                else {
                  Swal.fire('¡Error!', `Error al agendar la cita: ${error.error[0].error}`, 'error');
                }
              } else {
                Swal.fire('¡Error!', 'Error inesperado al agendar la cita.', 'error');
              }
            }
          });
        }
      });
    } else {
      this.formCita.markAllAsTouched();
    }
  }

  onPageChangeMedico(page: number): void {
    this.listaMedicos(page - 1);
  }

  totalPagesArrayMedico(): number[] {
    return Array.from({ length: this.totalPagesMedico }, (_, i) => i + 1);
  }


  onPageChangePaciente(page: number): void {
    this.listaMedicos(page - 1);
  }

  totalPagesArrayPaciente(): number[] {
    return Array.from({ length: this.totalPagesMedico }, (_, i) => i + 1);
  }
}
