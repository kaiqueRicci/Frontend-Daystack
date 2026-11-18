import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  imports: [
    Navbar,
    Sidebar,
    RouterLink,
    CommonModule

  ],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {

  private usuarioService = inject(UsuarioService);

  private nomeUsuario = signal('');
  private perfilUsuario = signal('');

  ngOnInit(){
    this.usuarioService.obterDadosUsuario()
    .subscribe((usuario) =>{
      this.nomeUsuario.set(usuario.nome);
      this.perfilUsuario.set(usuario.perfil);
    })
  }
}
