import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  public sidebarItems = [
    { label: 'Registro', url: './registar' },
    { label: 'Listado', url: './listar' },
    { label: 'Actualizar', url: './actualizar' },
    { label: 'Eliminar', url: './eliminar' },
  ];

  @ViewChild('navbarNav') navbarNav: any; // Obtén una referencia al elemento con la directiva #navbarNav

  ngAfterViewInit() {
    // Verifica si navbarNav está definido antes de acceder a nativeElement
    if (this.navbarNav && this.navbarNav.nativeElement) {
      console.log('Elemento navbarNav encontrado:', this.navbarNav.nativeElement);
    } else {
      // console.error('Elemento navbarNav no encontrado.');
    }
  }

  toggleNavbar() {
    // Verifica si navbarNav está definido antes de acceder a nativeElement
    if (this.navbarNav && this.navbarNav.nativeElement) {
      if (this.navbarNav.nativeElement.classList.contains('show')) {
        this.navbarNav.nativeElement.classList.remove('show');
      } else {
        this.navbarNav.nativeElement.classList.add('show');
      }
    } else {
      // console.error('Elemento navbarNav no encontrado.');
    }
  }

}
