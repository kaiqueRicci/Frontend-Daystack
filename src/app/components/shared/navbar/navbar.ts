import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [
    RouterLink,
    CommonModule
  ],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);


  private nomeUsuario = signal('');
  private perfilUsuario = signal('');

  ngOnInit(){
    this.usuarioService.obterDadosUsuario()
    .subscribe((usuario) =>{
      this.nomeUsuario.set(usuario.nome);
      this.perfilUsuario.set(usuario.perfil);
    })
  }

  logout(){
    if(confirm('Deseja realmente sair do sistema?')){
      this.usuarioService.logout();
      this.router.navigate(['/autenticar'])
    }
  }
}
