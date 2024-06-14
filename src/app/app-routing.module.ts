import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { InicioComponent } from './components/pages/inicio/inicio.component';
import { CrearComponent } from './auth/pages/resgistrar/registrar.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'crear', component: CrearComponent },
  { path: "inicio", component: InicioComponent },
  { path: 'medico', loadChildren: () => import('./medico/medico.module').then(m => m.MedicoModule) },
  { path: 'paciente', loadChildren: () => import('./paciente/paciente.module').then(m => m.PacienteModule) },
  { path: 'consulta', loadChildren: () => import('./consulta/consulta.module').then(m => m.ConsultaModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
