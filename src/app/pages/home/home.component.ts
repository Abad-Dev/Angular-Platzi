import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
        id: Date.now(),
        title: "Instalar el angular CLI",
        completed: false
    },
    {
        id: Date.now(),
        title: "Crear el proyecto con el comando ng new",
        completed: false
    },
    {
        id: Date.now(),
        title: "Crear componentes",
        completed: false
    }
  ]);

  taskCtrl = new FormControl('',{
    nonNullable: true,
    validators: [
        Validators.required,
        Validators.pattern('^\\S.*$'),
        Validators.minLength(3),
    ]
  });
  changeHandler = () => {
    if (!this.taskCtrl.valid){
        alert("El valor ingresado no es válido");
        return;
    }
    this.tasks.update((tasks) => [...tasks, 
    {
        id: Date.now(),
        title: this.taskCtrl.value,
        completed: false    
    }]);
    this.taskCtrl.setValue("");
  }

  completeTask = (task: Task) => {
    task.completed = !task.completed; // Esta forma es más simple pero no respeta el principio de inmutabilidad
  }

  deleteTask = (index: number) => {
    this.tasks.update((tasks) => {
        //[...tasks].splice(index, 1) No respeta inmutabilidad
        return tasks.filter((task: Task, i: number) => i != index);;
    });
  }
}
