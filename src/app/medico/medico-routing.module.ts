import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/pages/layout/layout.component';
import { RegistrarComponent } from './components/pages/registrar/registrar.component';
import { ListarComponent } from './components/pages/listar/listar.component';
import { ActualizarComponent } from './components/pages/actualizar/actualizar.component';
import { EliminarComponent } from './components/pages/eliminar/eliminar.component';

const routes: Routes = [
  {path:'',component:LayoutComponent,
    children:[
      {path:'registrar',component:RegistrarComponent},
      {path:'listar',component:ListarComponent},
      {path:'actualizar',component:ActualizarComponent},
      {path:'eliminar',component:EliminarComponent},
      {path:'',redirectTo:'listar',pathMatch:'full'}
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
