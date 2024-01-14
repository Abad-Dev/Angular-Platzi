import { Component, Injector, computed, effect, inject, signal } from '@angular/core';
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
  tasks = signal<Task[]>([]);
  injector = inject(Injector);  

  ngOnInit() {
    const storage = localStorage.getItem("tasks");
    if (storage){
        this.tasks.set(JSON.parse(storage));
    }

    this.trackTasks();
  }
  trackTasks = () => {
    effect(() => {
        const tasks = this.tasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log("oli")
    }, { injector: this.injector })
  }

  filter = signal('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter == 'pending') {
        return tasks.filter(task => task.completed != true);
    } else if (filter == 'completed') {
        return tasks.filter(task => task.completed != false);
    } else {
        return tasks;
    }
  })

  taskCtrl = new FormControl('',{
    nonNullable: true,
    validators: [
        Validators.required,
        Validators.pattern('^\\S.*$'),
        Validators.minLength(3),
    ]
  });

  updateFilter = (type: string) => {
    this.filter.set(type);
  }

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

  handleDblClick = (task: Task) => {
    this.tasks().map(task => task.editing = false);
    task.editing = true;
  }

  completeTask = (index: number) => {
    this.tasks.update((tasks) => {
        return tasks.map((task: Task, i: number) => {
            if (i == index) {
                task.completed = !task.completed;
            }
            return task
        });
    })
  }

  updateTask = (index: number, e: Event) => {
    const input = e.target as HTMLInputElement;
    this.tasks.update((tasks) => {
        return tasks.map((task: Task, i: number) => {
            if (i == index) {
                task.title = input.value;
                task.editing = false;
            }
            return task
        })
    });
  }

  deleteTask = (index: number) => {
    this.tasks.update((tasks) => {
        //[...tasks].splice(index, 1) No respeta inmutabilidad
        return tasks.filter((task: Task, i: number) => i != index);
    });
  }

  clearCompletedTasks = () => {
    this.tasks.update((tasks) => {
        return tasks.filter(task => !task.completed);
    })
  }
}
