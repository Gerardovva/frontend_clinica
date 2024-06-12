import { ApiService } from './../../service/consultas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../service/validator.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tu-componente',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  medicoForm!: FormGroup;
  registroExitoso: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private validadorService: ValidatorsService,
  ) { }

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.validadorService.email)]],
      telefono: ['', Validators.required],
      documento: ['', Validators.required],
      especialidad: ['', Validators.required],
      direccion: this.fb.group({
        calle: [''],
        distrito: [''],
        ciudad: [''],
        numero: [''],
        complemento: ['']
      })
    });
  }

  registrarMedico(): void {
    if (this.medicoForm.valid) {
      const medicoData = this.medicoForm.value;
      this.apiService.registroMedico(medicoData).subscribe({
        next: (response) => {
          // console.log("Completado");
          // console.log('Médico registrado exitosamente:', response);
        
          this.registroExitoso = true; // Marca que el registro fue exitoso
          this.medicoForm.reset(); // Resetea el formulario
        },
        error: (error) => {
          console.error('Error al registrar médico:', error);
          // console.log(medicoData);
        },
        complete: () => {
          console.log("Tarea realizada");
          Swal.fire({
            title: "¿Estás seguro de realizar el registro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, registrar"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Registro exitoso!",
                text: "El medico a sido registrado.",
                icon: "success"
              });
            }
          });
        }
      });
    } else {
      this.medicoForm.markAllAsTouched();
    }
  }

  onAreaSelected(event: any): void {
    const especialidadControl = this.medicoForm.get('especialidad');
    if (especialidadControl) {
      especialidadControl.setValue(event.target.value.toUpperCase());
    }
  }

  isValidField(field: string) {
    return this.validadorService.isValidField(this.medicoForm, field);
  }

}//cierre clase
