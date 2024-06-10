import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../service/consultas.service';
import { ValidatorsService } from '../../service/validator.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  public formRegistro: FormGroup;

  selectedFile?: File;
  selectedEspecialidad: string = '';

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private validadorService: ValidatorsService,
  ) {
    this.formRegistro = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.validadorService.email)]],
      telefono: ['', [Validators.required]],
      documento: ['', [Validators.required, Validators.maxLength(10)]],
      especialidad: ['', [Validators.required]],
      direccion: this.fb.group({
        calle: ['', Validators.required],
        distrito: [''],
        ciudad: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: ['']
      })
    });
  }

  onSubmit() {
    if (this.formRegistro.valid) {
      this.apiService.registroMedico(this.formRegistro.value)
        .subscribe({
          next: data => {
            console.log("Peticion post", data);
            this.formRegistro.reset(); // Limpiar el formulario después del envío exitoso
          },
          error: error => {
            console.error("Error en la petición:", error);
      
          }
        });
    } else {
      this.formRegistro.markAllAsTouched();
    }
  }

  onAreaSelected(event: any) {
    this.selectedEspecialidad = event.target.value;
  }

  isValidField(field: string) {
    return this.validadorService.isValidField(this.formRegistro, field);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmits() {
    if (this.selectedFile) {
      console.log('Archivo seleccionado:', this.selectedFile);
      // Aquí puedes enviar el archivo al servidor utilizando HttpClient, por ejemplo
      // Reinicia el estado del campo de archivo seleccionado después de la carga
    } else {
      console.log('No se ha seleccionado ningún archivo.');
    }
  }
}
