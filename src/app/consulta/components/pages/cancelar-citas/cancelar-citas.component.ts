import { Component, OnInit } from '@angular/core';
import { ConsultaCitasservices } from '../../service/consultaapi.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-cancelar-citas',
  templateUrl: './cancelar-citas.component.html',
  styleUrls: ['./cancelar-citas.component.css']
})
export class CancelarCitasComponent implements OnInit {

  formCitaCancelada!: FormGroup;
  consultaCitas: any[] = [];
  citaSeleccionada: any;

  filtroForm!: FormGroup; // Formulario reactivo para la búsqueda
  filtroTexto: string = ''; // Propiedad para el filtro de texto

  constructor(
    private citasservices: ConsultaCitasservices,
    private fb: FormBuilder,
    private datePipe: DatePipe 
  ) { }

  ngOnInit(): void {
    this.formCitaCancelada = this.fb.group({
      idConsulta: [''],
      motivo: ['']
    });

    // Inicializar el formulario reactivo para la búsqueda
    this.filtroForm = this.fb.group({
      filtroTexto: ['']
    });

    this.cargarCitas(); 
  }

  // Método para cargar todas las citas
  cargarCitas() {
    this.citasservices.obtenerConsultaCitas().subscribe({
      next: (response) => {
        this.consultaCitas = response.content.map((consulta: any) => ({
          ...consulta,
          fechaFormateada: this.datePipe.transform(consulta.fecha, 'dd/MM/yyyy HH:mm') 
        }));
        // console.log("Citas cargadas", this.consultaCitas);
      }, 
      error: (error) => {
        console.error("Error al obtener las citas", error);
      }
    });
  }

 

  // Método para buscar citas
  buscarCitas() {
    this.filtroTexto = this.filtroForm.get('filtroTexto')?.value.toLowerCase(); // Obtener el valor del filtro y convertir a minúsculas

    if (this.filtroTexto) {
      // Filtrar las citas basadas en el filtroTexto
      this.consultaCitas = this.consultaCitas.filter(cita =>
        cita.nombreMedico.toLowerCase().includes(this.filtroTexto) ||
        cita.nombrePaciente.toLowerCase().includes(this.filtroTexto)
      );
    } else {
      // Si el campo de búsqueda está vacío, cargar todas las citas nuevamente
      this.cargarCitas();
    }
  }

  // Método para cancelar cita
  listaCitas() {
    if (this.formCitaCancelada.valid) {
      const payload = this.formCitaCancelada.value;

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: '¿Estás seguro de cancelar la cita?',
        text: 'No podrás revertirlo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cancelar cita',
        cancelButtonText: 'No, cancelar operación',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.citasservices.cancelarCita(payload).subscribe({
            next: (response: any) => {
              // console.log('Cita cancelada con éxito', response);
              swalWithBootstrapButtons.fire(
                'Cancelado!',
                'Tu cita ha sido cancelada.',
                'success'
              );
              // Recargar las citas después de cancelar
              this.cargarCitas();
            },
            error: (error: any) => {
              console.error('Error al cancelar la cita', error);
              if (error.error === 'Consulta solamente puede ser cancelada con antecedencia mínima de 24h!') {
                swalWithBootstrapButtons.fire(
                  'Error al cancelar la cita',
                  'Consulta solamente puede ser cancelada con antecedencia mínima de 24h!',
                  'error'
                );
              } else {
                swalWithBootstrapButtons.fire(
                  'Error',
                  'Ocurrió un error al cancelar la cita.',
                  'error'
                );
              }
            }
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Tu cita no ha sido cancelada :)',
            'error'
          );
        }
      });

    } else {
      this.formCitaCancelada.markAllAsTouched();
    }
  }

  // Método para seleccionar una cita y preparar el formulario de cancelación
  citaCancelada(cita: any): void {
    // console.log('Cancelar cita:', cita);
    this.citaSeleccionada = cita;
    this.formCitaCancelada.patchValue({
      idConsulta: cita.id 
    });
  }

}
