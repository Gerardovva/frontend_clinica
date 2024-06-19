import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { AgendarCitasComponent } from './components/pages/agendar-citas/agendar-citas.component';
import { ConsultarCitasComponent } from './components/pages/consultar-citas/consultar-citas.component';
import { CancelarCitasComponent } from './components/pages/cancelar-citas/cancelar-citas.component';
import { LayoutCitasComponent } from './components/pages/layout-citas/layout-citas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'; // Asegúrate de importar DatePipe



@NgModule({
  declarations: [
    AgendarCitasComponent,
    ConsultarCitasComponent,
    CancelarCitasComponent,
    LayoutCitasComponent
  ],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DatePipe // Agrega DatePipe en la lista de proveedores
  ]
})
export class ConsultaModule { }
