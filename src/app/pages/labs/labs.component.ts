import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'todoapp';
  tasks = [
    "Instalar el angular CLI",
    "Crear el proyecto con el comando ng new",
    "Crear componentes"
  ];

  nombre = "Fabian";
}
