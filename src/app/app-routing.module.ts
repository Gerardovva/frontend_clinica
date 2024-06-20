import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { InicioComponent } from './components/pages/inicio/inicio.component';
import { CrearComponent } from './auth/pages/resgistrar/registrar.component';
import { AuthGuardCanActivate, AuthGuardcanMatch } from './auth/guard/auth-guard.guard';
import { PublicGuardCanMatch, publicGuardCanActive } from './auth/guard/public.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate:[publicGuardCanActive],canMatch:[PublicGuardCanMatch]},
  { path: 'crear', component: CrearComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuardCanActivate],canMatch:[AuthGuardcanMatch] },
  { path: 'medico', loadChildren: () => import('./medico/medico.module').then(m => m.MedicoModule),canActivate: [AuthGuardCanActivate],canMatch:[AuthGuardcanMatch] },
  { path: 'paciente', loadChildren: () => import('./paciente/paciente.module').then(m => m.PacienteModule),canActivate: [AuthGuardCanActivate],canMatch:[AuthGuardcanMatch]},
  { path: 'consulta', loadChildren: () => import('./consulta/consulta.module').then(m => m.ConsultaModule),canActivate: [AuthGuardCanActivate],canMatch:[AuthGuardcanMatch] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
