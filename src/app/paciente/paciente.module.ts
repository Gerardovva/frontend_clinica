import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { ActualizarComponent } from './components/pages/actualizar/actualizar.component';
import { RegistrarComponent } from './components/pages/registrar/registrar.component';
import { ListarComponent } from './components/pages/listar/listar.component';
import { EliminarComponent } from './components/pages/eliminar/eliminar.component';
import { LayoutComponent } from './components/pages/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActualizarComponent,
    RegistrarComponent,
    ListarComponent,
    EliminarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class PacienteModule { }
