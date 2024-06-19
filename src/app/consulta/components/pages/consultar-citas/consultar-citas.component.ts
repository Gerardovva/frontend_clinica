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
  onSubmit() {
    throw new Error('Method not implemented.');
  }

  consultas: any[] = [];
  consultaCitas: any[] = [];
  pacientes: any[] = [];
  medicos: any[] = [];
  doctorForm!: FormGroup;
  pacienteForm!:FormGroup;

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
      id: ['', [Validators.required]]
    });

    this.doctorForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      especialidad: ['', Validators.required],
      direccion: this.fb.group({
        calle: ['', Validators.required],
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: ['']
      })
    });


    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      especialidad: ['', Validators.required],
      direccion: this.fb.group({
        calle: ['', Validators.required],
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: ['']
      })
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
    const id = this.formPaciente.value.id;
    this.consultaService.obtenerPacienteId(id).subscribe({
      next: (response) => {
        this.pacientes = [response]; // Aquí asegúrate de asignar un array con el objeto del paciente
      },
      error: (error) => {
        console.error("Error al obtener los datos", error);
        this.pacientes = []; // Limpiar el array si no se encontró ningún paciente
      }
    });
  }


  medicoPorId() {
   if(this.formMedico.valid){
    const id = this.formMedico.value.id;
    this.apiService.obtenerMedicoId(id).subscribe({
        next: (response) => {
            this.medicos = [response]; // Asigna directamente la respuesta del servicio al objeto medicos
        },
        error: (error) => {
            console.error("Error al obtener los datos", error);
            this.medicos = []; // Limpiar el objeto si no se encontró ningún médico
        }
    });
   }else{
    this.formMedico.markAllAsTouched()
   }
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
