import { ConsultaService } from './../../service/consulta.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  pacientes: any[] = [];
  totalPages: number = 0; // Número total de páginas de médicos
  currentPage: number = 0; // Número de la página actual
  totalElements: number = 0; // Total de elementos (médicos) en la base de datos
  pageSize: number = 10; // Tamaño de página predeterminado



  constructor(private consultaService: ConsultaService) { }


  ngOnInit(): void {
    this.listaPaciente(0);

  }

  listaPaciente(page: number) {
    this.consultaService.listarPaciente(page, this.pageSize).subscribe({
      next: (response) => {
        this.pacientes = response.content
        this.totalPages = response.totalPages; // Actualiza el número total de páginas
        this.currentPage = response.number + 1; // Ajusta el número de la página actual
        this.totalElements = response.totalElements; // Actualiza el total de elementos (médicos)
        console.log("respuesta api: ", { response });
        console.log("res", this.pacientes);
      }
    })
  }

    // Método para manejar el cambio de página
    onPageChange(page: number): void {
      this.listaPaciente(page - 1); // Carga los médicos de la página seleccionada
      // Restamos 1 para ajustar el índice de página, ya que la API comienza desde 0
    }
  

    totalPagesArray(): number[] {
      // Genera un array con una longitud igual al número total de páginas.
      // Para cada elemento del array, asigna el número de página correspondiente.
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

}
