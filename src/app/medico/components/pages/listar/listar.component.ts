import { ApiService } from './../../service/consultas.service'; // Importación del servicio ApiService
import { Component, OnInit } from '@angular/core'; // Importación de Component y OnInit desde Angular core

@Component({
  selector: 'app-listar', // Selector del componente
  templateUrl: './listar.component.html', // Ruta del archivo HTML asociado al componente
  styleUrls: ['./listar.component.css'] // Rutas de los archivos CSS asociados al componente
})
export class ListarComponent implements OnInit {
  medicos: any[] = []; // Arreglo para almacenar la lista de médicos
  totalPages: number = 0; // Número total de páginas de médicos
  currentPage: number = 0; // Número de la página actual
  totalElements: number = 0; // Total de elementos (médicos) en la base de datos
  pageSize: number = 10; // Tamaño de página predeterminado

  constructor(private apiService: ApiService) { } // Inyección de dependencia del servicio ApiService

  ngOnInit(): void {
    // Método de inicialización del componente
    this.loadMedicos(0); // Carga inicial de médicos, mostrando la primera página al inicio
  }

  // Método para cargar la lista de médicos desde el servicio ApiService
  loadMedicos(page: number): void {
    // Llamada al método listar del servicio ApiService, pasando el número de página y el tamaño de página
    this.apiService.listarMedico(page, this.pageSize).subscribe({
      next: (data: any) => { // Función que se ejecuta al recibir la respuesta del servicio
        this.medicos = data.content; // Actualiza el arreglo de médicos con los datos recibidos
        this.totalPages = data.totalPages; // Actualiza el número total de páginas
        this.currentPage = data.number + 1; // Ajusta el número de la página actual
        this.totalElements = data.totalElements; // Actualiza el total de elementos (médicos)
        // console.log("response", { data });

      },
      error: (error) => { // Función que maneja los errores en caso de que ocurran
        console.error("Error al obtener los médicos:", error);
      }
    });
  }

  // Método para manejar el cambio de página
  onPageChange(page: number): void {
    this.loadMedicos(page - 1); // Carga los médicos de la página seleccionada
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
