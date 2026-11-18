import { Component } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  imports: [
    Sidebar,
    Navbar
  ],
  selector: 'app-cadastrar-tarefa',
  styleUrl: './cadastrar-tarefa.css',
  templateUrl: './cadastrar-tarefa.html',
})
export class CadastrarTarefa {}
