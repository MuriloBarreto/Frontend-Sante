import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private token: string;


  constructor(private http: HttpClient) { }
  public getToken (): string{
    return this.token;
  }

  criarUsuario (nome: string, email: string, senha: string){
    const authData: AuthData = {
      name: nome,
      email: email,
      password: senha
      }
      this.http.post("http://localhost:3000/api/usuario/signup", authData).subscribe(resposta =>
      {
      console.log(resposta)
      });
  }

  login (nome: string, email: string, senha: string){
    const authData: AuthData = {
    name: nome,
    email: email,
    password: senha
    }
    this.http.post<{token : string}>("http://localhost:3000/api/usuario/login", authData).subscribe(resposta => {
    console.log(resposta)
    this.token = resposta.token;
    });
  }
}
