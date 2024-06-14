import { ApiService } from './../../../../medico/components/service/consultas.service';
import { ConsultaService } from './../../../../paciente/components/service/consulta.service';
import { ConsultaApi } from './../../service/consultaapi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-citas',
  templateUrl: './consultar-citas.component.html',
  styleUrls: ['./consultar-citas.component.css']
})
export class ConsultarCitasComponent implements OnInit {

  consultas: any[] = [];
  pacientes: any[] = [];
  medicos: any[] = [];

  constructor(
    private consultaApi: ConsultaApi,
    private consultaService: ConsultaService,
    private apiService: ApiService
  ) { }


  ngOnInit(): void {
    this.listaConsulta()
    this.PacientePorId(3);
  }


  listaConsulta() {
    this.consultaApi.obtenerConsultas().subscribe({
      next: (data) => {
        console.log("datos", data);
        this.consultas = data.content
      },
      error: (error) => {
        console.log("error al obtener los datso ", error);

      }
    })
  }


  PacientePorId(id: number) {
    this.consultaService.obtenerPacienteId(id).subscribe({
      next: (response) => {
        console.log("data", response);

      },error:(error)=>{
        console.log("error al obtener los datos", error);
        
      }
    })
  }





}
