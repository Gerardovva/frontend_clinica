import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaService } from './../../service/consulta.service';
import { Component, OnInit } from '@angular/core';
import { Cons } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  formPacientes!: FormGroup;
  registroExitoso: boolean = false;

  constructor(
    private consultaService: ConsultaService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.formPacientes = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      documento: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: this.fb.group({
        calle: ['', Validators.required],
        ciudad: ['', Validators.required],
        estado: [''], // Agregado estado
        codigoPostal: [''], // Agregado códigoPostal
        distrito: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: ['']
      })
    });
  }
  

  onSubmit(): void {
    if (this.formPacientes.valid) {
      const medicoData = this.formPacientes.value;
      // console.log("Datos formulario ", this.formPacientes.value);
      this.consultaService.registrarPacientes(medicoData)
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
          this.consultaService.registrarPacientes(medicoData).subscribe({
            next: (response) => {
              Swal.fire({
                title: "Registro exitoso!",
                text: "El medico ha sido registrado.",
                icon: "success"
              });
              this.registroExitoso = true; // Marca que el registro fue exitoso
              this.formPacientes.reset(); // Resetea el formulario
            },
            error: (error) => {
              console.error('Error al registrar médico:', error);
            },
            complete: () => {
              console.log("Tarea realizada");
            }
          });
        }
      });

    } else {
      // Marcar campos inválidos si lo deseas
      this.markFormGroupTouched(this.formPacientes);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }



}
