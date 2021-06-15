import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { UsuarioService } from '../usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form:FormGroup;
  constructor(private formBuilder: FormBuilder, private usurioService: UsuarioService) { }

  createForm(){
    this.form = this.formBuilder.group({
      email: [""],
      senha: [""],
    })
  }
  ngOnInit(): void {
    this.createForm();
  }

  insertData(){
    console.log(this.form.value);
    this.usurioService.login(this.form.value.nome,this.form.value.email,this.form.value.senha)
  }

}
