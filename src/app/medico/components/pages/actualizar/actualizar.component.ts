import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../../service/consultas.service';
import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  formActualizarMedico!: FormGroup;
  medicoForm!: FormGroup;
  medicos: any[] = [];
  medicoSeleccionado: any;
  mostrarModal = false;
  registroExitoso: boolean = false;

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
      telefono: [''],
      especialidad: [''],
      email: [''],
      documento: [''],
      direccion: this.fb.group({
        calle: [''],
        distrito: [''],
        ciudad: [''],
        numero: [''],
        complemento: ['']

      })
    });
  }

  listaMedico(page: number) {
    this.apiService.listarMedico(page, this.pageSize).subscribe({
      next: (response) => {
        this.medicos = response.content;
        this.totalPages = response.totalPages; // Actualiza el número total de páginas
        this.currentPage = response.number + 1; // Ajusta el número de la página actual
        this.totalElements = response.totalElements; // Actualiza el total de elementos (médicos)
        // console.log("respuesta ", this.medicos);
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

  datosMedico(medico: any): void {
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

  guardarCambios(): void {
    if (this.medicoForm.valid) {
      const medicoData = this.medicoForm.value;
      // Envía los datos actualizados al servicio para actualizarlos en el backend
      this.apiService.actualizarMedico(medicoData).subscribe({
        next: (response) => {
          // console.log('Médico actualizado exitosamente:', response);
          // Realiza cualquier otra acción necesaria después de la actualización
          this.registroExitoso = true; // Marca que el registro fue exitoso
          this.listaMedico(this.currentPage - 1); // Vuelve a cargar los datos después de la actualización
          this.medicoForm.reset(); // Resetea el formulario
         
          this.mostrarModal = false; // Cierra el modal después de guardar los cambios
        },
        error: (error) => {
          console.error('Error al actualizar médico:', error);
        },complete:()=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Actualizacion correcta",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    } else {
      this.medicoForm.markAllAsTouched();
    }
  }

  // Método para manejar el cambio de página
  onPageChange(page: number): void {
    this.listaMedico(page-1); // Llama a listaMedico con la página seleccionada
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
