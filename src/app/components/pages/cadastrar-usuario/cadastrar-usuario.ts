import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { CadastrarUsuarioRequest } from '../../../models/Usuario.model';

@Component({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  selector: 'app-cadastrar-usuario',
  styleUrl: './cadastrar-usuario.css',
  templateUrl: './cadastrar-usuario.html',
})
export class CadastrarUsuario {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  carregando = signal(false);
  menssagemErro = signal('');

formCadastro = new FormGroup({
  nome: new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]),
  email: new FormControl('', [
    Validators.required,
    Validators.email,
  ]),
  senha: new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s])\S{8,}$/
    ),
  ]),
});

 criarUsuario(){
   this.menssagemErro.set('');
   if(this.formCadastro.invalid){
 
     this.formCadastro.markAllAsTouched();
     return;
   }
  this.carregando.set(true);




  const request : CadastrarUsuarioRequest = {
    nome : this.formCadastro.controls.nome.value ?? '',
    email : this.formCadastro.controls.email.value ?? '',
    senha : this.formCadastro.controls.senha.value ?? ''
  }

  this.usuarioService.criarUsuario(request)
  .subscribe({
    next: (response) =>{
      this.carregando.set(false);
      this.formCadastro.reset();
      this.router.navigate(['/autenticar'], { queryParams : { cadastro : true}})
    },
    error: (e) =>{
      this.carregando.set(false);
      this.menssagemErro.set(e.error.mensagem);
    }
  })
 }

}
