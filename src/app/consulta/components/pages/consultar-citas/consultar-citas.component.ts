import { ConsultaApi } from './../../service/consultaapi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-citas',
  templateUrl: './consultar-citas.component.html',
  styleUrls: ['./consultar-citas.component.css']
})
export class ConsultarCitasComponent  implements OnInit{

  consultas: any[] = [];
  constructor(private consultaApi: ConsultaApi) { }
  ngOnInit(): void {
   this.listaConsulta()
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





}
