import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private token: string;
  private autenticado: boolean = false;
  private authStatusSubject = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer;
  private idUsuario: string;


  constructor(private http: HttpClient, private router: Router) { }
  public getToken (): string{
    return this.token;
  }

  public getStatusSubject (){
    return this.authStatusSubject.asObservable();
  }

  public isAutenticado(): boolean{
    return this.autenticado;
  }

  public getIdUsuario (){
    return this.idUsuario;
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
      this.router.navigate(['/login']);
  }

  login (nome: string, email: string, senha: string){
    const authData: AuthData = {
    name: nome,
    email: email,
    password: senha
    }
    this.http.post<{token : string, expiresIn: number, idUsuario: string}>("http://localhost:3000/api/usuario/login", authData).subscribe(resposta => {
    console.log(resposta)
    this.token = resposta.token;
    if (this.token){
      const tempoValidadeToken = resposta.expiresIn;
      this.tokenTimer = setTimeout(() => {
      this.logout()
      },tempoValidadeToken * 1000);
      this.autenticado = true;
      this.idUsuario = resposta.idUsuario;
      this.authStatusSubject.next(true);
      this.salvarDadosDeAutenticacao(this.token, new Date(new Date().getTime() + tempoValidadeToken * 1000 ), this.idUsuario);
      this.router.navigate(['/'])
    }
    });
  }

  logout(){
    this.token = null;
    clearTimeout(this.tokenTimer);
    this.idUsuario = null;
    this.removerDadosDeAutenticacao();
    this.authStatusSubject.next(false);
  }

  private salvarDadosDeAutenticacao (token: string, validade: Date, idUsuario: string){
    localStorage.setItem('token', token);
    localStorage.setItem('validade', validade.toISOString());
    localStorage.setItem('idUsuario', idUsuario);
  }

  private removerDadosDeAutenticacao (){
    localStorage.removeItem('token');
    localStorage.removeItem('validade');
    localStorage.removeItem('idUsuario');
  }

  autenticarAutomaticamente (){
    const dadosAutenticacao = this.obterDadosDeAutenticacao();
    if (dadosAutenticacao){
    //pegamos a data atual
    const agora = new Date ();
    //verificamos a diferenca entre a validade e a data atual
    const diferenca = dadosAutenticacao.validade.getTime() - agora.getTime();
    //se a diferença for positiva, o token ainda vale
    console.log (diferenca);
    if (diferenca > 0){
    this.token = dadosAutenticacao.token;
    console.log(dadosAutenticacao);
    this.autenticado = true;
    this.idUsuario = dadosAutenticacao.idUsuario;
    //diferença ja esta em milissegundos, não multiplique!
    this.tokenTimer = setTimeout(() => {
    this.logout()
    }, diferenca);
    this.authStatusSubject.next(true);
    }
    }
    }

    private obterDadosDeAutenticacao(){
      const token = localStorage.getItem ('token');
      const validade = localStorage.getItem ('validade');
      const idUsuario = localStorage.getItem("idUsuario");
      if (token && validade) {
        return {token: token, validade: new Date(validade), idUsuario: idUsuario}
      }
      return null;
    }
}
