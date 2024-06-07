import { InicioComponent } from './components/pages/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { CrearComponent } from './auth/pages/resgistrar/registrar.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'crear', component: CrearComponent },
  { path: "inicio", component: InicioComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: 'medico', loadChildren: () => import('./medico/medico.module').then(m => m.MedicoModule) },
  { path: 'paciente', loadChildren: () => import('./paciente/paciente.module').then(m => m.PacienteModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
