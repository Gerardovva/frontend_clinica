import { Component } from '@angular/core';
import { AuthService } from '../../service/auths.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { validadorService } from 'src/app/components/services/validador.service';

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

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private validadorService: validadorService
  ) { }

  onSubmit() {
    this.spinner = true;

    if (this.form.valid) {

      this.authService.autenticacion({
        login: this.form.value.login,
        clave: this.form.value.clave
      }).pipe(
       // tap(res => console.log("este es el token", res)) // Acceder al campo 'token' de la respuesta
        
      ).subscribe({
        next: (response => {

        }),
        error: (errors: any) => {

        },
        complete: () => {
          setTimeout(() => {
            this.spinner = true;
            this.router.navigateByUrl("inicio")
          }, 1000)
        }


      });
    } else {
      this.form.markAllAsTouched();
    }
  }


  isValidField(field: string) {
    return this.validadorService.isValidField(this.form, field);
  }

}
