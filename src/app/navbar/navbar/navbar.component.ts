import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../../auth/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private authObserver: Subscription;
  public autenticado: boolean = false;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.autenticado = this.usuarioService.isAutenticado();
    this.authObserver =
    this.usuarioService.getStatusSubject().
    subscribe((autenticado) => {
    this.autenticado = autenticado;
    })
  }

  ngOnDestroy(){
    this.authObserver.unsubscribe();
  }

  Logout(){
    this.usuarioService.logout();
  }
}
