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
  opSexo:any[];
  opSintomas: any[];
  opTeste: any[];
  opCronico: any[];
  opRisco: any[];
  opMental: any[];
  constructor(private pacienteService: PacienteService, private router: ActivatedRoute, private toastr: ToastrService) { }


  form = new FormGroup({
    nome: new FormControl(''),
    idade: new FormControl(''),
    altura: new FormControl(''),
    peso: new FormControl(''),
    sexo: new FormControl(''),
    sintomas: new FormControl(''),
    teste: new FormControl(''),
    cronico: new FormControl(''),
    risco: new FormControl(''),
    mental: new FormControl(''),
  })

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.getData();
    this.opSexo = this.getValor();
    this.opSintomas = this.getSintomas();
    this.opTeste = this.getTeste();
    this.opCronico = this.getCronico();
    this.opRisco = this.getRisco();
    this.opMental = this.getMental();
  }

  getData(){
    this.pacienteService.getDataById(this.id).subscribe(res => {
      this.data = res;
      this.paciente = this.data;
      this.form = new FormGroup({
        nome: new FormControl(this.paciente.nome),
        idade: new FormControl(this.paciente.idade),
        altura: new FormControl(this.paciente.altura),
        peso: new FormControl(this.paciente.peso),
        sexo: new FormControl(this.paciente.sexo),
        sintomas: new FormControl(this.paciente.sintomas),
        teste: new FormControl(this.paciente.teste),
        cronico: new FormControl(this.paciente.cronico),
        risco: new FormControl(this.paciente.risco),
        mental: new FormControl(this.paciente.mental),
      })
    })
  }
  updateData(){
    // alert(this.form.value.sexo);
    this.pacienteService.updateData(this.id, this.form.value).subscribe(res => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
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
