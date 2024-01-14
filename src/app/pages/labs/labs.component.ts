import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'todoapp';
  tasks = signal([
    "Instalar el angular CLI",
    "Crear el proyecto con el comando ng new",
    "Crear componentes"
  ]);

  inputCtrl = new FormControl('Pepe');

  clickHandler = () => {
    console.log("hola");
  }
}
