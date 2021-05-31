import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from 'src/app/service/paciente.service';
import { Paciente } from '../../model/paciente.model';

@Component({
  selector: 'app-view-paciente',
  templateUrl: './view-paciente.component.html',
  styleUrls: ['./view-paciente.component.css']
})
export class ViewPacienteComponent implements OnInit {
  form:FormGroup;
  paciente = new Paciente();
  id:any;
  data:any;
  camSintomas:any;
  ativos = "Ativos";
  camTeste:any;
  TestePositivo = "Teste Positivo"
  camRisco:any;
  camCronico:any;
  sim = "Sim";
  camMental: any;
  camImc:any;
  constructor(private pacienteService: PacienteService,private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params.id;
    this.getData();
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
        imc: new FormControl(this.paciente.imc)
      })
      this.camSintomas = this.paciente.sintomas;
      this.camTeste = this.paciente.teste;
      this.camRisco = this.paciente.risco;
      this.camCronico = this.paciente.cronico;
      this.camMental = this.paciente.mental;
      this.camImc = this.paciente.imc;
    })
  }
}
