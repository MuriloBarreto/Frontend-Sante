import { Component, OnInit, OnDestroy } from '@angular/core';
import { PacienteService } from 'src/app/service/paciente.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/auth/usuario.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  pacientes:any;
  data: any;
  pag : Number = 1 ;
  contador : Number = 5;
  public autenticado: boolean = false;
  private authObserver: Subscription;
  public idUsuario: string;
  filtro: string;

  constructor(private pacienteService: PacienteService, private toastr: ToastrService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.getPacienteData();
    this.idUsuario = this.usuarioService.getIdUsuario();
    this.filtro = this.idUsuario;
    this.authObserver = this.usuarioService
    .getStatusSubject().
    subscribe((autenticado) => this.autenticado = autenticado)
    this.autenticado = this.usuarioService.isAutenticado();
  }
  ngOnDestroy(): void {
    this.authObserver.unsubscribe();
  }

  getPacienteData() {
    this.pacienteService.getData().subscribe(res => {
      console.log(res);
      this.pacientes = res;
    })

  }

  deleteData(id){
    this.pacienteService.deleteData(id).subscribe(res =>{
      this.data = res;
      this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 1000,
        progressBar: true
      });
      this.getPacienteData();
    })
  }
}
