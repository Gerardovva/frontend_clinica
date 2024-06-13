import { Content } from './../../interface/medico.interface';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/consultas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent {

  formActualizarMedico!: FormGroup;
  medicoForm!: FormGroup;
  medicos: any[] = [];
  medicoSeleccionado: any;
  mostrarModal = false;
  registroExitoso: boolean = false;
  id: any[]=[];

  totalPages: number = 0; // Número total de páginas de médicos
  currentPage: number = 0; // Número de la página actual
  totalElements: number = 0; // Total de elementos (médicos) en la base de datos
  pageSize: number = 10; // Tamaño de página predeterminado


  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.listaMedico(0); // Llama a listaMedico con la página 0 al iniciar el componente
    this.formActualizarMedico = this.fb.group({
      nombre: ['', [Validators.required]]
    });

    // Inicializa medicoForm aquí
    this.medicoForm = this.fb.group({
      id: [''],
      nombre: [''],

      especialidad: [''],
      email: [''],
      documento: [''],

    });
  }

  listaMedico(page: number) {
    this.apiService.listarMedico(page, this.pageSize).subscribe({
      next: (response) => {
        this.medicos = response.content;
        this.totalPages = response.totalPages; // Actualiza el número total de páginas
        this.currentPage = response.number + 1; // Ajusta el número de la página actual
        this.totalElements = response.totalElements; // Actualiza el total de elementos (médicos)
        // console.log("respuesta ",response); 
      },
      error: (error) => {
        console.error("Error al obtener los datos", error);
      }
    });
  }

  buscarPorNombre(event: any) {
    const nombre = event.target.value
    // Verificar si se ha ingresado un nombre para buscar
    if (nombre.trim() !== '') {
      // Filtrar los médicos cuyo nombre incluye el texto ingresado (insensible a mayúsculas/minúsculas)
      this.medicos = this.medicos.filter(medico =>
        medico.nombre.toLowerCase().includes(nombre.toLowerCase())
      );
    } else {
      // Si no se ingresa un nombre, mostrar todos los médicos nuevamente
      this.listaMedico(0); // Llama a listaMedico con la página 0 para mostrar todos los médicos
    }
  }

  editarMedico(medico: any): void {
    // console.log('Editar médico:', medico);

    // Establece los datos del médico seleccionado en el formulario de edición
    this.medicoSeleccionado = medico;
    this.mostrarModal = true;
    this.medicoForm.patchValue({
      id: medico.id,
      nombre: medico.nombre,
      especialidad: medico.especialidad,
      email: medico.email,
      documento: medico.documento,
    });
  }


  eliminarMedico(id: any) {
    if (this.medicoForm.valid) {
      const dataMedico = this.medicoForm.value;
      Swal.fire({
        title: "¿Está seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.eliminarMedico(id).subscribe({
            next: (response) => {
              Swal.fire({
                title: "¡Eliminado!",
                text: "Su operacion ha sido eliminado.",
                icon: "success"
              });
              this.medicoForm.reset();
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
    this.listaMedico(page - 1); // Llama a listaMedico con la página seleccionada
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
