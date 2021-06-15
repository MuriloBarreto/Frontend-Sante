import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form:FormGroup;
  constructor(private formBuilder: FormBuilder, private usurioService: UsuarioService) { }

  createForm(){
    this.form = this.formBuilder.group({
      nome:[''],
      email: [""],
      senha: [""],
    })
  }
  ngOnInit(): void {
    this.createForm();
  }


  insert(){
    console.log(this.form.value.nome)
    this.usurioService.criarUsuario(this.form.value.nome,this.form.value.email,this.form.value.senha);
  }
}
