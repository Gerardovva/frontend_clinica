import { LocalStorageService } from './../../services/localstorage.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

 constructor(private router:Router,private localStorageService:LocalStorageService){}



 salir() {
  Swal.fire({
    title: '¡ALERTA!',
    text: "ESTAS SEGURO DE CERRAR TU SESION",
    icon: 'question',
    showDenyButton: true,
    denyButtonText: "Cancelar",
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Aceptar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.localStorageService.remove("JWTtoken");
      this.router.navigateByUrl('/login')
    
    }
  });
}
}
