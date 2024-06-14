import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'oaciente-layout',
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

  // Referencia al elemento navbarNav del HTML
  @ViewChild('navbarNav') navbarNav: ElementRef | undefined;

  // Variable para rastrear si el menú está colapsado o no
  isNavbarCollapsed = true;

  constructor(private elementRef: ElementRef) { }
 
  // Función para alternar el estado de colapso del menú
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  // HostListener para detectar clics fuera del menú y cerrarlo en consecuencia
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Si el menú está colapsado o si no se ha inicializado la referencia al elemento navbarNav,
    // o si el evento de clic proviene de un elemento fuera del menú, se cierra el menú.
    if (this.isNavbarCollapsed || !this.navbarNav || !this.navbarNav.nativeElement.contains(event.target)) {
      this.isNavbarCollapsed = true;
    }
  }


}
