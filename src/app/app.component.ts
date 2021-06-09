import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './auth/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mean';

  constructor(private usuarioService: UsuarioService){
  }
  ngOnInit(){
  this.usuarioService.autenticarAutomaticamente();
  }
}
