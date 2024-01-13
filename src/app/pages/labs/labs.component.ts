import { Component, signal } from '@angular/core';
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
  tasks = signal([
    "Instalar el angular CLI",
    "Crear el proyecto con el comando ng new",
    "Crear componentes"
  ]);

  nombre = signal('Pepe');

  clickHandler = () => {
    console.log("hola");
  }

  inputHandler = (event: Event) => {
    console.log("Evento", event);
    const input = event.target as HTMLInputElement;
    this.nombre.set(input.value)
  }
}
