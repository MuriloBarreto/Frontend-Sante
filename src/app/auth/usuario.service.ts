import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private token: string;
  private autenticado: boolean = false;
  private authStatusSubject = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer;
  private idUsuario: string;
  private nomeUsuario: string;
  data;
  public e :boolean = true;


  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService) { }

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

  public getName (){
    return this.nomeUsuario
  }

  criarUsuario (nome: string, email: string, senha: string){
    const authData: AuthData = {
      name: nome,
      email: email,
      password: senha
      }
      this.e = true;
      this.http.post("http://localhost:3000/api/usuario/signup", authData).subscribe(resposta =>
      {
      this.data = resposta;
      this.e = false;
      // console.log(resposta)
      this.toastr.info(JSON.stringify(this.data.code),JSON.stringify(this.data.mensagem),{
        timeOut: 1000,
        progressBar: true
      })
      this.router.navigate(['/login']);
      }).add(error =>{
        if(this.e){
        this.toastr.info("401","Erro com as credenciais",{
          timeOut: 1000,
          progressBar: true
        })
       }
      });

  }

  login (nome: string, email: string, senha: string){
    const authData: AuthData = {
    name: nome,
    email: email,
    password: senha
    }
    this.e = true;
    this.http.post<{token : string, expiresIn: number, idUsuario: string, name: string}>("http://localhost:3000/api/usuario/login", authData).subscribe(resposta => {
    // console.log(resposta);
    this.data = resposta;
    this.token = resposta.token;
    if(this.data.code == 200){
      this.toastr.info(JSON.stringify(this.data.code),JSON.stringify(this.data.mensagem),{
        timeOut: 1000,
        progressBar: true
      })
    }
    if (this.token){
      const tempoValidadeToken = resposta.expiresIn;
      this.tokenTimer = setTimeout(() => {
      this.logout()
      },tempoValidadeToken * 1000);
      this.autenticado = true;
      this.idUsuario = resposta.idUsuario;
      this.nomeUsuario = resposta.name;
      this.authStatusSubject.next(true);
      this.salvarDadosDeAutenticacao(this.token, new Date(new Date().getTime() + tempoValidadeToken * 1000 ), this.idUsuario, this.nomeUsuario);
      this.e = false;
      this.router.navigate(['/'])
    }
    })
    .add(error =>{
      if(this.e){
      this.toastr.info("401","Email ou senha inv??lidos",{
        timeOut: 1000,
        progressBar: true
      })
     }
    })
  }

  logout(){
    this.token = null;
    clearTimeout(this.tokenTimer);
    this.idUsuario = null;
    this.nomeUsuario = null;
    this.removerDadosDeAutenticacao();
    this.authStatusSubject.next(false);
  }

  private salvarDadosDeAutenticacao (token: string, validade: Date, idUsuario: string, nomeUsuario: string){
    localStorage.setItem('token', token);
    localStorage.setItem('validade', validade.toISOString());
    localStorage.setItem('idUsuario', idUsuario);
    localStorage.setItem('nomeUsuario', nomeUsuario);
  }

  private removerDadosDeAutenticacao (){
    localStorage.removeItem('token');
    localStorage.removeItem('validade');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('nomeUsuario')
  }

  autenticarAutomaticamente (){
    const dadosAutenticacao = this.obterDadosDeAutenticacao();
    if (dadosAutenticacao){
    //pegamos a data atual
    const agora = new Date ();
    //verificamos a diferenca entre a validade e a data atual
    const diferenca = dadosAutenticacao.validade.getTime() - agora.getTime();
    //se a diferen??a for positiva, o token ainda vale
    // console.log (diferenca);
    if (diferenca > 0){
    this.token = dadosAutenticacao.token;
    // console.log(dadosAutenticacao);
    this.autenticado = true;
    this.idUsuario = dadosAutenticacao.idUsuario;
    //diferen??a ja esta em milissegundos, n??o multiplique!
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
      const nomeUsuario = localStorage.getItem("nomeUsuario");
      if (token && validade) {
        return {token: token, validade: new Date(validade), idUsuario: idUsuario, nomeUsuario: nomeUsuario}
      }
      return null;
    }
}
