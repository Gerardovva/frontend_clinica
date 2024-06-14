import { TestBed } from '@angular/core/testing';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaService } from './../../service/consulta.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'paciente-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {
  pacienteSeleccionado: any;
  formPaciente!: FormGroup;
  formEliminarPaciente!: FormGroup;
  formActualizarPaciente!: FormGroup;
  pacientes: any[] = [];

  totalPages: number = 0; // Número total de páginas de médicos
  currentPage: number = 0; // Número de la página actual
  totalElements: number = 0; // Total de elementos (médicos) en la base de datos
  pageSize: number = 10; // Tamaño de página predeterminado

  constructor(
    private consultaService: ConsultaService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formularioPacienteBuscar();
    this.formularioActualizarPaciente();
    this.formularioElimarPaciente();

    this.obtenerPaciente(0);
  }


  formularioPacienteBuscar() {
    this.formPaciente = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  formularioElimarPaciente() {
    this.formEliminarPaciente = this.fb.group({
      id: [],
      nombre: [''],
      email: [''],
      telefono: [''],
      documento: ['']

    })

  }

  formularioActualizarPaciente() {
    this.formActualizarPaciente = this.fb.group({
      id: [''],
      nombre: [''],
      email: ['', [Validators.email]],
      documento: [''],
      telefono: [''],
      direccion: this.fb.group({
        calle: [''],
        ciudad: [''],
        estado: [''], // Agregado estado
        codigoPostal: [''], // Agregado códigoPostal
        distrito: [''],
        numero: [''],
        complemento: ['']
      })
    })
  }

  obtenerPaciente(page: number) {
    this.consultaService.listarPaciente(page, this.pageSize).subscribe({
      next: (response) => {
        // console.log("respuesta", response);
        this.pacientes = response.content;
        this.totalPages = response.totalPages; // Actualiza el número total de páginas
        this.currentPage = response.number + 1; // Ajusta el número de la página actual
        this.totalElements = response.totalElements; // Actualiza el total de elementos (paciente)

      }, error: (error) => {
        console.error("error al optener los datos", error);

      }, complete: () => {

      }
    });
  }


  buscarPersona(event: any) {
    const nombre = event.target.value;
    if (nombre.trim() !== '') {
      this.pacientes = this.pacientes.filter(paciente => {
        return paciente.nombre.toLowerCase().includes(nombre.toLowerCase());
      });
    } else {
      this.obtenerPaciente(0);
    }
  }


  pacienteElimanrDatos(paciente: any): void {
    this.pacienteSeleccionado = paciente;
    this.formEliminarPaciente.patchValue({
      id: paciente.id,
      nombre: paciente.nombre,
      email: paciente.email,
      telefono: paciente.telefono,
      documento: paciente.documento
    })
  }

  pacienteActualizarDatos(paciente: any): void {
    this.pacienteSeleccionado = paciente;
    this.formActualizarPaciente.patchValue({
      id: paciente.id,
      nombre: paciente.nombre,
      email: paciente.email,
      telefono: paciente.telefono,
      documento: paciente.documento,
    })
  }


  actualizarPaciente() {
    if (this.formActualizarPaciente.valid) {
      const paciente = this.formActualizarPaciente.value;
      Swal.fire({
        title: "¿Quieres guardar los cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`
      }).then((result) => {
        if (result.isConfirmed) {
          this.consultaService.actualizarPacientes(paciente).subscribe({
            next: (data) => {
              Swal.fire("Guardado!", "", "success");
              this.obtenerPaciente(this.currentPage - 1); // Vuelve a cargar los datos después de la actualización
              this.formActualizarPaciente.reset();
            },
            error: (error) => {
              console.error("Error al actualizar el paciente", error);
              Swal.fire("Error al guardar", "", "error");
            }
          });
        } else if (result.isDenied) {
          Swal.fire("Los cambios no se guardan", "", "info");
        }
      });
    }
  }


  eliminarPaciente(id: any) {
    if (this.formEliminarPaciente.valid) {
      const dataMedico = this.formEliminarPaciente.value;
      Swal.fire({
        title: "¿Está seguro de borrar al paciente?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.consultaService.eliminarPacientes(id).subscribe({
            next: (response) => {
              Swal.fire({
                title: "¡Eliminado!",
                text: "Su operacion ha sido exitosa.",
                icon: "success"
              });
              this.obtenerPaciente(this.currentPage - 1); // Vuelve a cargar los datos después de la actualización
              this.formEliminarPaciente.reset();
            }, error: (error) => {
              console.error("la operacion fallo ", error);
            }
          })

        }
      });

    } else {

    }



  }




  // Método para manejar el cambio de página
  onPageChange(page: number): void {
    this.obtenerPaciente(page - 1); // Carga los médicos de la página seleccionada
    // Restamos 1 para ajustar el índice de página, ya que la API comienza desde 0
  }

  /**
  * Método para generar un array que representa el número de páginas disponibles para la paginación.
  * @returns Array de números que representa las páginas disponibles para la paginación.
  */
  totalPagesArray(): number[] {
    // Genera un array con una longitud igual al número total de páginas.
    // Para cada elemento del array, asigna el número de página correspondiente.
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }




}
