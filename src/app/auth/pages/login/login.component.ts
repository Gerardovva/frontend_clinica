import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auths.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public form: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    clave: ['', [Validators.required]]
  });

  public spinner: boolean = false;
  public showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  onSubmit() {
    this.spinner = true;

    if (this.form.valid) {
      this.authService.autenticacion({
        login: this.form.value.login,
        clave: this.form.value.clave
      }).subscribe({
        next: (response) => {
          // Aquí puedes manejar la respuesta exitosa si es necesario
        },
        error: (error) => {
          this.spinner = false;
          console.error("Error en la autenticación: ", error);

          // Manejo específico para error HTTP
          if (error.status === 0) {
            Swal.fire({
              icon: 'error',
              title: 'Error de conexión',
              text: 'No se pudo conectar al servidor. Por favor, verifica tu conexión a internet o intenta más tarde.'
            });
          } else {
            // Otros manejos de errores HTTP, si es necesario
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error durante la autenticación. Por favor, intenta nuevamente.'
            });
          }
        },
        complete: () => {
          this.spinner = false;
          // Redirige solo si la autenticación fue exitosa
          this.router.navigateByUrl("inicio");
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.spinner = false;
    }
  }

  // Método para validar campos del formulario
  isValidField(field: string) {
    const control = this.form.get(field);
    return control?.touched && control?.invalid;
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
