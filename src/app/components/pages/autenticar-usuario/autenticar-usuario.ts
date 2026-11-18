import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { AutenticarUsuarioRequest } from '../../../models/Usuario.model';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  selector: 'app-autenticar-usuario',
  styleUrl: './autenticar-usuario.css',
  templateUrl: './autenticar-usuario.html',
})
export class AutenticarUsuario {

  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  cadastroRealizado = this.route.snapshot.queryParamMap.get('cadastro') === 'sucesso';

  carregando = signal(false);
  mensagemErro = signal('');

  formAutenticar = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  autenticarUsuario() {
    this.mensagemErro.set('');

    if (this.formAutenticar.invalid) {
      this.formAutenticar.markAllAsTouched();
      return;
    }
    this.carregando.set(true);

    const request: AutenticarUsuarioRequest = {
      email: this.formAutenticar.controls.email.value ?? '',
      senha: this.formAutenticar.controls.senha.value ?? ''
    }

    this.usuarioService.autenticarUsuario(request)
      .subscribe({
        next: () => {
          this.carregando.set(false);
          this.formAutenticar.reset();
          this.router.navigate(['/dashboard'])
        },
        error: (e: HttpErrorResponse) => {
          this.carregando.set(false);

          if (e.status === 401) {
            this.mensagemErro.set('E-mail ou senha incorretos.');
            return;
          }

          this.mensagemErro.set(
            e.error?.mensagem ??
            e.error?.message ??
            'Não foi possível entrar. Tente novamente.'
          );
        }
      })

  }
}
