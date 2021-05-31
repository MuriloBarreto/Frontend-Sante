import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/service/paciente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  pacientes:any;
  data: any;
  constructor(private pacienteService: PacienteService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPacienteData();
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
