import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit{
  todos: Todo[] = [];

  constructor(private todoService : TodoService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void{
    this.todoService.getTodos().subscribe((todos: Todo[]) => this.todos = todos);
  }

  addTodo(name: string, datetime_due: Date | null, details: string): void{
    this.todoService.addTodo(name, datetime_due, details).subscribe((todo: Todo) => this.todos.push(todo));
  }
}
