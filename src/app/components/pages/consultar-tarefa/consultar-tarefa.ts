import { Component } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';
import { Navbar } from '../../shared/navbar/navbar';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    Sidebar,
    Navbar,
    RouterLink
  ],
  selector: 'app-consultar-tarefa',
  styleUrl: './consultar-tarefa.css',
  templateUrl: './consultar-tarefa.html',
})
export class ConsultarTarefa {}
