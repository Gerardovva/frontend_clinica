import { ApiService } from './../../../../medico/components/service/consultas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaCitasservices } from '../../service/consultaapi.service';
import { ConsultaService } from 'src/app/paciente/components/service/consulta.service';

@Component({
  selector: 'app-agendar-citas',
  templateUrl: './agendar-citas.component.html',
  styleUrls: ['./agendar-citas.component.css']
})
export class AgendarCitasComponent implements OnInit {

  medicos: any[] = []; // Arreglo para almacenar la lista de médicos
  pacientes: any[] = [];

  totalPages: number = 0; // Número total de páginas de médicos
  currentPage: number = 0; // Número de la página actual
  totalElements: number = 0; // Total de elementos (médicos) en la base de datos
  pageSize: number = 10; // Tamaño de página predeterminado

  public formulario: FormGroup = this.fb.group({
    areaSeleccionada: ['', [Validators.required]]
  })




  constructor(
    private fb: FormBuilder,
    private citaService: ConsultaCitasservices,
    private pacienteService: ConsultaService,
    private medicoService: ApiService,
  ) { }


  ngOnInit(): void {
    this.listaMedicos(0);
    this.listaPaciente(0);

  }



  listaMedicos(page: number) {
    this.medicoService.listarMedico(page, this.pageSize).subscribe({
      next: (data: any) => { // Función que se ejecuta al recibir la respuesta del servicio
        this.medicos = data.content; // Actualiza el arreglo de médicos con los datos recibidos
        this.totalPages = data.totalPages; // Actualiza el número total de páginas
        this.currentPage = data.number + 1; // Ajusta el número de la página actual
        this.totalElements = data.totalElements; // Actualiza el total de elementos (médicos)
        console.log("medicos", this.medicos);

      },
      error: (error) => { // Función que maneja los errores en caso de que ocurran
        console.error("Error al obtener los médicos:", error);
      }
    })
  }


  listaPaciente(page: number) {
    this.pacienteService.listarPaciente(page, this.pageSize).subscribe({
      next: (response) => {
        this.pacientes = response.content
        this.totalPages = response.totalPages; // Actualiza el número total de páginas
        this.currentPage = response.number + 1; // Ajusta el número de la página actual
        this.totalElements = response.totalElements; // Actualiza el total de elementos (médicos)
        // console.log("respuesta api: ", { response });
        console.log("Pacientes ", this.pacientes);
      }
    })
  }

  onPageChange(page: number): void {
    this.listaMedicos(page - 1); // Carga los médicos de la página seleccionada
    // Restamos 1 para ajustar el índice de página, ya que la API comienza desde 0
  }


  totalPagesArray(): number[] {
    // Genera un array con una longitud igual al número total de páginas.
    // Para cada elemento del array, asigna el número de página correspondiente.
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }



}
