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
  opSexo:any[];
  opSintomas: any[];
  opTeste: any[];
  opCronico: any[];
  opRisco: any[];
  opMental: any[];
  constructor(private pacienteService: PacienteService, private formBuilder: FormBuilder, private toastr:ToastrService, private router:Router) { }

  createForm(){
    this.form = this.formBuilder.group({
      nome: ["", Validators.required],
      idade: ["", Validators.required],
      altura: ["", Validators.required],
      peso: ["", Validators.required],
      sexo: ["", Validators.required],
      sintomas: ["", Validators.required],
      teste: ["", Validators.required],
      cronico: ["", Validators.required],
      risco: ["", Validators.required],
      mental: ["", Validators.required]
    })
  }
  ngOnInit(): void {
    this.createForm();
    this.opSexo = this.getValor();
    this.opSintomas = this.getSintomas();
    this.opTeste = this.getTeste();
    this.opCronico = this.getCronico();
    this.opRisco = this.getRisco();
    this.opMental = this.getMental();
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

  getValor(){
    return [
      {valor: 'Masculino', desc: 'Masculino'},
      {valor: 'Feminino', desc: 'Feminino'}
    ]
  }
  getSintomas(){
    return [
      {valor: 'Ativos', desc: 'Ativos'},
      {valor: 'Inativos', desc: 'Inativos'}
    ]
  }
  getTeste(){
    return [
      {valor: 'Teste Positivo', desc: 'Teste Positivo'},
      {valor: 'Teste Negativo', desc: 'Teste Negativo'},
      {valor: 'Nunca Testou', desc: 'Nunca Testou'}
    ]
  }
  getCronico(){
    return[
      {valor: 'Sim', desc: 'Sim'},
      {valor: 'Não', desc: 'Não'}
    ]
  }
  getRisco(){
    return[
      {valor: 'Sim', desc: 'Sim'},
      {valor: 'Não', desc: 'Não'}
    ]
  }
  getMental(){
    return[
      {valor: 'Sim', desc: 'Sim'},
      {valor: 'Não', desc: 'Não'}
    ]
  }
}
