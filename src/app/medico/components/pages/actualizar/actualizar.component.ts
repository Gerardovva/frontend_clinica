// // actualizar.component.ts
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ApiService } from './../../service/consultas.service';
// import { Component, Input, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-actualizar',
//   templateUrl: './actualizar.component.html',
//   styleUrls: ['./actualizar.component.css']
// })
// export class ActualizarComponent implements OnInit {

//   formActualizarMedico!: FormGroup;
//   medicoForm!: FormGroup;
//   medicos: any[] = [];
//   formMedico:boolean=false;
//   medicoSeleccionado: any;
//   mostrarModal = false;

//   currentPage = 1; // Página actual
//   pageSize = 10; // Tamaño de página

//   constructor(
//     private apiService: ApiService,
//     private fb: FormBuilder,
//   ) { }

//   ngOnInit(): void {
//     this.listaMedico();
//     this.formActualizarMedico = this.fb.group({
//       nombre: ['', [Validators.required]]
//     });

//     // Inicializa medicoForm aquí
//     this.medicoForm = this.fb.group({
//       nombre: [''],
//       especialidad: [''],
//       email: [''],
//       telefono: [''],
//       documento: [''],
//       direccion: this.fb.group({
//         calle: [''],
//         distrito: [''],
//         ciudad: [''],
//         numero: [''],
//         complemento: ['']
//       })
//     });
//   }

//   listaMedico() {
//     this.apiService.listar(this.currentPage, this.pageSize).subscribe({
//       next: (response) => {
//         this.medicos = response.content;
//         // console.log("respuesta ", this.medicos);
//       },
//       error: (error) => {
//         console.error("Error al obtener los datos", error);
//       }
//     });
//   }

//   buscarPorNombre(event: any) {
//     const nombre = event.target.value
//     // Verificar si se ha ingresado un nombre para buscar
//     if (nombre.trim() !== '') {
//       // Filtrar los médicos cuyo nombre incluye el texto ingresado (insensible a mayúsculas/minúsculas)
//       this.medicos = this.medicos.filter(medico =>
//         medico.nombre.toLowerCase().includes(nombre.toLowerCase())
//       );
//     } else {
//       // Si no se ingresa un nombre, mostrar todos los médicos nuevamente
//       this.listaMedico();
//     }
//   }

//   editarMedico(medico: any): void {
//   this.formMedico = true;
//   console.log('Editar médico:', medico);

//   // Verificar si medico y medico.direccion están definidos
//   if (medico && medico.direccion) {
//     // Establece los datos del médico seleccionado en el formulario de edición
//     this.medicoSeleccionado = medico;
//     this.mostrarModal = true;
//     this.medicoForm.patchValue({
//       nombre: medico.nombre,
//       especialidad: medico.especialidad,
//       email: medico.email,
//       telefono: medico.telefono,
//       documento: medico.documento,
//       direccion: {
//         calle: medico.direccion.calle ? medico.direccion.calle : '',
//         distrito: medico.direccion.distrito ? medico.direccion.distrito : '',
//         ciudad: medico.direccion.ciudad ? medico.direccion.ciudad : '',
//         numero: medico.direccion.numero ? medico.direccion.numero : '',
//         complemento: medico.direccion.complemento ? medico.direccion.complemento : ''
//       }
//     });
//   } else {
//     console.error('El objeto medico o sus propiedades direccion no están definidos correctamente.');
//   }
// }


//   guardarCambios(): void {
//     if (this.medicoForm.valid) {
//       const medicoData = this.medicoForm.value;
//       // Envía los datos actualizados al servicio para actualizarlos en el backend
//       this.apiService.actualizarMedico(medicoData).subscribe({
//         next: (response) => {
//           console.log('Médico actualizado exitosamente:', response);
//           // Realiza cualquier otra acción necesaria después de la actualización
//           this.mostrarModal = false; // Cierra el modal después de guardar los cambios
//         },
//         error: (error) => {
//           console.error('Error al actualizar médico:', error);
//         }
//       });
//     } else {
//       this.medicoForm.markAllAsTouched();
//     }
//   }
// }


// actualizar.component.ts
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../../service/consultas.service';
import { Component, Input, OnInit } from '@angular/core';

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

  currentPage = 1; // Página actual
  pageSize = 10; // Tamaño de página

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.listaMedico();
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

  listaMedico() {
    this.apiService.listar(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.medicos = response.content;
        console.log("respuesta ", this.medicos);
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
      this.listaMedico();
    }
  }

  editarMedico(medico: any): void {
    console.log('Editar médico:', medico);

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
          console.log('Médico actualizado exitosamente:', response);
          // Realiza cualquier otra acción necesaria después de la actualización
          this.mostrarModal = false; // Cierra el modal después de guardar los cambios
        },
        error: (error) => {
          console.error('Error al actualizar médico:', error);
        }
      });
    } else {
      this.medicoForm.markAllAsTouched();
    }
  }
}
