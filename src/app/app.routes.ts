import { Routes } from '@angular/router';
import { AutenticarUsuario } from './components/pages/autenticar-usuario/autenticar-usuario';
import { CadastrarUsuario } from './components/pages/cadastrar-usuario/cadastrar-usuario';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { NotFound } from './components/pages/not-found/not-found';
import { CadastrarTarefa } from './components/pages/cadastrar-tarefa/cadastrar-tarefa';
import { ConsultarTarefa } from './components/pages/consultar-tarefa/consultar-tarefa';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
//Rota padrao
  {
    path: '',
    redirectTo: '/autenticar',
    pathMatch: 'full'
  },

  {
    path: 'autenticar',
    component: AutenticarUsuario
  },

  {
    path: 'criar-usuario',
    component: CadastrarUsuario
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

   {
    path: 'cadastrar-tarefa',
    component: CadastrarTarefa,
    canActivate: [authGuard]
  },

   {
    path: 'consultar-tarefa',
    component: ConsultarTarefa,
    canActivate: [authGuard]
  },

  {
    path: '**',
    component: NotFound,
  }

];
