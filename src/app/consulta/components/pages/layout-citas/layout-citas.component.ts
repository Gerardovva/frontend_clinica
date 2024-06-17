import { Component, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-layout-citas',
  templateUrl: './layout-citas.component.html',
  styleUrls: ['./layout-citas.component.css']
})
export class LayoutCitasComponent implements AfterViewInit {
  public items = [
    { label: 'Agendar', url: './agendar-citas' },
    { label: 'Consultar', url: './consultar-citas' },
    { label: 'Cancelar', url: './cancelar-citas' },
  ];

  @ViewChild('navbarNav') navbarNav: ElementRef | undefined;

  isNavbarCollapsed = true;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    // Verificar si navbarNav está inicializado antes de usarlo
    if (this.navbarNav) {
      // console.log('navbarNav initialized:', this.navbarNav.nativeElement);
    } else {
      console.error('navbarNav is undefined or null.');
    }
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.isNavbarCollapsed || !this.navbarNav || !this.navbarNav.nativeElement.contains(event.target as Node)) {
      this.isNavbarCollapsed = true;
    }
  }
}
