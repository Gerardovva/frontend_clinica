
import { ApiService } from './../../service/consultas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ValidatorsService } from '../../service/validator.service';
import { validadorService } from './../../../../components/services/validador.service';

@Component({
  selector: 'app-tu-componente',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  medicoForm!: FormGroup;

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
          console.log("Completado");
          console.log('Médico registrado exitosamente:', response);
        },
        error: (error) => {
          console.error('Error al registrar médico:', error);
        },
        complete: () => {
          console.log("Tarea realizada");
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
