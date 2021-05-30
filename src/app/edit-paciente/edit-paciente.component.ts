import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PacienteService } from 'src/app/service/paciente.service';
import { Paciente } from '../model/paciente.model';

@Component({
  selector: 'app-edit-paciente',
  templateUrl: './edit-paciente.component.html',
  styleUrls: ['./edit-paciente.component.css']
})
export class EditPacienteComponent implements OnInit {
  paciente = new Paciente();
  id:any;
  data:any;
  constructor(private pacienteService: PacienteService, private router: ActivatedRoute, private toastr: ToastrService) { }

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    salary: new FormControl(''),
  })

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.getData();
  }

  getData(){
    this.pacienteService.getDataById(this.id).subscribe(res => {
      this.data = res;
      this.paciente = this.data;
      this.form = new FormGroup({
        name: new FormControl(this.paciente.name),
        email: new FormControl(this.paciente.email),
        salary: new FormControl(this.paciente.salary),
      })
    })
  }
  updateData(){
    this.pacienteService.updateData(this.id, this.form.value).subscribe(res => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 1000,
        progressBar: true
      })
    })
  }
}
