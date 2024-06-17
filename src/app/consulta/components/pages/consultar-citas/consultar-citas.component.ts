import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../../../medico/components/service/consultas.service';
import { ConsultaService } from './../../../../paciente/components/service/consulta.service';
import { ConsultaCitasservices } from './../../service/consultaapi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-citas',
  templateUrl: './consultar-citas.component.html',
  styleUrls: ['./consultar-citas.component.css']
})
export class ConsultarCitasComponent implements OnInit {

  consultas: any[] = [];
  consultaCitas: any[] = [];
  pacientes: any[] = [];
  medicos: any[] = [];

  formPaciente!: FormGroup;
  formMedico!: FormGroup;


  constructor(
    private consultaCita: ConsultaCitasservices,
    private consultaService: ConsultaService,
    private apiService: ApiService,
    private fb: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.listaConsulta();
    this.citas();

    this.formPaciente = this.fb.group({
      id: ['', [Validators.required]]
    });

    this.formMedico = this.fb.group({
      id: ['', Validators.required]
    });

  }


  listaConsulta() {
    this.consultaCita.obtenerConsultas().subscribe({
      next: (data) => {
        // console.log("datos", data);
        this.consultas = data.content
      },
      error: (error) => {
        console.log("error al obtener los datso ", error);

      }
    })
  }


  PacientePorId() {
    const id = this.formPaciente.value.id; // Obtén el valor del campo 'id' del formulario
    this.consultaService.obtenerPacienteId(id).subscribe({
      next: (response) => {
        this.pacientes = response.nombre
        // console.log("Id de paciente es: ", response);
        // console.log("nombre paciente: ", this.pacientes);

      },
      error: (error) => {
        console.error("Error al obtener los datos", error);
      }
    });
  }


  medicoPorId() {
    const id = this.formMedico.value.id;
    this.apiService.obtenerMedicoId(id).subscribe({
      next: (response) => {
        this.medicos = response.nombre;
        // console.log("medico por id: ", response);
        // console.log("nombre medico", this.medicos);


      }, error: (error) => {
        console.error("error al optener los datos", error);

      }
    })
  }


  citas() {
    this.consultaCita.obtenerConsultaCitas().subscribe({
      next: (response) => {
        this.consultaCitas = response.content;

      }, error: (error) => {
        console.error("Error al optener los datos ", error);

      }
    })
  }



}
