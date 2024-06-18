import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaRoutingModule } from './consulta-routing.module';
import { AgendarCitasComponent } from './components/pages/agendar-citas/agendar-citas.component';
import { ConsultarCitasComponent } from './components/pages/consultar-citas/consultar-citas.component';
import { CancelarCitasComponent } from './components/pages/cancelar-citas/cancelar-citas.component';
import { LayoutCitasComponent } from './components/pages/layout-citas/layout-citas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



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
  ]
})
export class ConsultaModule { }
