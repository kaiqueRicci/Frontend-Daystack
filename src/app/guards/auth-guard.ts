import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { catchError, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const authGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  const paginaLogin = router.createUrlTree(
    ['/autenticar'],
    {
      queryParams: {
        returnUrl: state.url
      }
    }
  );

  //Permitir o acesso quando existir token
  if(!usuarioService.possuiToken()){
    return paginaLogin;
  }

 
  return usuarioService.obterDadosUsuario().pipe(
    map(() => true),
    catchError((error: HttpErrorResponse) =>{
      if (error.status === 401){
        usuarioService.logout();
        return of(paginaLogin)
      }
      console.error(
        'Não foi possível verificar o acesso:',
        error.status
      );
      return of(false)
      
    }));
};
