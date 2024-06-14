import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-citas',
  templateUrl: './layout-citas.component.html',
  styleUrls: ['./layout-citas.component.css']
})
export class LayoutCitasComponent {


  public Items = [
    { label: 'Agendar', url: './agendar-citas' },
    { label: 'Consultar', url: './consultar-citas' },
    { label: 'Cancelar', url: './cancelar-citas' },
   
  ];


}
