import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoRoutingModule } from './medico-routing.module';

import { EliminarComponent } from './components/pages/eliminar/eliminar.component';
import { ListarComponent } from './components/pages/listar/listar.component';
import { ActualizarComponent } from './components/pages/actualizar/actualizar.component';
import { RegistrarComponent } from './components/pages/registrar/registrar.component';
import { LayoutComponent } from './components/pages/layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    RegistrarComponent,
    EliminarComponent,
    ListarComponent,
    ActualizarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    MedicoRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class MedicoModule { }
