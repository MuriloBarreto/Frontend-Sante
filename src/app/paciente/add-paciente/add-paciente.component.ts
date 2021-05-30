import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/service/paciente.service'
import { ToastrService } from 'ngx-toastr'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import{ Router } from '@angular/router';

@Component({
  selector: 'app-add-paciente',
  templateUrl: './add-paciente.component.html',
  styleUrls: ['./add-paciente.component.css']
})
export class AddPacienteComponent implements OnInit {
  form:FormGroup;
  submitted=false;
  data;
  constructor(private pacienteService: PacienteService, private formBuilder: FormBuilder, private toastr:ToastrService, private router:Router) { }

  createForm(){
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required, Validators.email],
      salary: ["", Validators.required]
    })
  }
  ngOnInit(): void {
    this.createForm();
  }

  get f(){
    return this.form.controls;
  }
  insertData(){
    this.submitted=true;
    if(this.form.invalid){
      return;
    }

    this.pacienteService.insertData(this.form.value).subscribe(result => {
      this.data = result;
      this.toastr.success(JSON.stringify(this.data.code),JSON.stringify(this.data.message)
      ,{
        timeOut: 1000,
        progressBar: true
      })
    })
  }
}
