import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutCitasComponent } from './components/pages/layout-citas/layout-citas.component';
import { AgendarCitasComponent } from './components/pages/agendar-citas/agendar-citas.component';
import { ConsultarCitasComponent } from './components/pages/consultar-citas/consultar-citas.component';
import { CancelarCitasComponent } from './components/pages/cancelar-citas/cancelar-citas.component';

const routes: Routes = [
  {
    path: '', component: LayoutCitasComponent,
    children: [
      {path:'agendar-citas',component:AgendarCitasComponent},
      {path:'consultar-citas',component:ConsultarCitasComponent},
      {path:'cancelar-citas',component:CancelarCitasComponent},
      {path:'',redirectTo:'consultar-citas',pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }
