import { HttpClient } from "@angular/common/http";
import { inject, Service, signal } from "@angular/core";
import { AutenticarUsuarioRequest, AutenticarUsuarioResponse, CadastrarUsuarioRequest, CadastrarUsuarioResponse, DadosUsuarioResponse } from "../models/Usuario.model";
import { tap } from "rxjs";

@Service()
export class UsuarioService{

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8082/api/v1/usuarios';

  usuarioAutenticado = signal<boolean>(
    this.possuiToken()
  );

  criarUsuario(request : CadastrarUsuarioRequest){
    return this.http.post<CadastrarUsuarioResponse>
    (`${this.apiUrl}/cadastrar`, request);

  }

  autenticarUsuario(request : AutenticarUsuarioRequest){

    return this.http.post<AutenticarUsuarioResponse>
    (`${this.apiUrl}/autenticar`, request)
    .pipe(tap(response =>{
      sessionStorage.setItem('accessToken', response.accessToken);
      this.usuarioAutenticado.set(true);
    }));
  }

  obterDadosUsuario(){
    return this.http.get<DadosUsuarioResponse>(
      `${this.apiUrl}/dados`, {
        headers: {
          Authorization: `Bearer ${this.obterToken()}`
        }
      });
  }



  obterToken(): string | null {
    return sessionStorage.getItem('accessToken')
  }

  possuiToken(): boolean{
    const accessToken = sessionStorage.getItem('accessToken')
    return accessToken !== null
    && accessToken.trim() !== ''
    && accessToken !== 'undefined'
    && accessToken !== 'null';
  }

  logout(): void{
    sessionStorage.removeItem('acessToken');
    this.usuarioAutenticado.set(false);
  }

}