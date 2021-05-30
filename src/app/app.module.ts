import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacientesComponent } from './paciente/pacientes/pacientes.component';
import { NavbarComponent } from './navbar/navbar/navbar.component'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { AddPacienteComponent } from './paciente/add-paciente/add-paciente.component'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPacienteComponent } from './edit-paciente/edit-paciente.component'

const appRoutes = [
  { path: "", component: PacientesComponent},
  { path: 'add-paciente', component: AddPacienteComponent},
  {path: 'edit/:id', component: EditPacienteComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    PacientesComponent,
    NavbarComponent,
    AddPacienteComponent,
    EditPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
