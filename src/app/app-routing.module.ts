import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPacienteComponent } from './paciente/add-paciente/add-paciente.component'
import { EditPacienteComponent } from './edit-paciente/edit-paciente.component';
import { ViewPacienteComponent } from './paciente/view-paciente/view-paciente.component';
import { RecomendeCovidComponent } from './redirecionamento/recomende-covid/recomende-covid.component';
import { MapaPComponent } from './redirecionamento/mapa-p/mapa-p.component';
import { BemEstarComponent } from './redirecionamento/bem-estar/bem-estar.component';
import { MapaCComponent } from './redirecionamento/mapa-c/mapa-c.component'
import { PacientesComponent } from './paciente/pacientes/pacientes.component';
import {LoginComponent} from './auth/login/login.component';;
import {SignupComponent} from './auth/signup/signup.component';

const routes: Routes = [
  { path: "", component: PacientesComponent},
  { path: 'add-paciente', component: AddPacienteComponent},
  {path: 'edit/:id', component: EditPacienteComponent},
  {path: 'view/:id', component: ViewPacienteComponent},
  {path: 'rec-covid', component: RecomendeCovidComponent},
  {path: 'map-mental', component: MapaPComponent},
  {path: 'bem-estar', component: BemEstarComponent},
  {path: 'map-clinica', component: MapaCComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
