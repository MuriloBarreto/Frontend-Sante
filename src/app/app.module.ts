import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacientesComponent } from './paciente/pacientes/pacientes.component';
import { NavbarComponent } from './navbar/navbar/navbar.component'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { AddPacienteComponent } from './paciente/add-paciente/add-paciente.component'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPacienteComponent } from './edit-paciente/edit-paciente.component';
import { ViewPacienteComponent } from './paciente/view-paciente/view-paciente.component';
import { RecomendeCovidComponent } from './redirecionamento/recomende-covid/recomende-covid.component';
import { MapaPComponent } from './redirecionamento/mapa-p/mapa-p.component';
import { BemEstarComponent } from './redirecionamento/bem-estar/bem-estar.component';
import { FooterComponent } from './footer/footer.component';
import { MapaCComponent } from './redirecionamento/mapa-c/mapa-c.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component'
import { AuthInterceptor } from './auth/auth-interceptor'
import { NgxPaginationModule } from 'ngx-pagination';
import { ArrayFiltroPipe } from './array-filtro.pipe';
import { HomeComponent } from './home/home.component';

// const appRoutes = [
//   { path: "", component: PacientesComponent},
//   { path: 'add-paciente', component: AddPacienteComponent},
//   {path: 'edit/:id', component: EditPacienteComponent},
//   {path: 'view/:id', component: ViewPacienteComponent},
//   {path: 'rec-covid', component: RecomendeCovidComponent},
//   {path: 'map-mental', component: MapaPComponent},
//   {path: 'bem-estar', component: BemEstarComponent},
//   {path: 'map-clinica', component: MapaCComponent},
// ]

@NgModule({
  declarations: [
    AppComponent,
    PacientesComponent,
    NavbarComponent,
    AddPacienteComponent,
    EditPacienteComponent,
    ViewPacienteComponent,
    RecomendeCovidComponent,
    MapaPComponent,
    BemEstarComponent,
    FooterComponent,
    MapaCComponent,
    LoginComponent,
    SignupComponent,
    ArrayFiltroPipe,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule,
    NgxPaginationModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
