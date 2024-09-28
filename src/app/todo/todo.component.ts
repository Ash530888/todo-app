import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

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
    this.todoService.getTodos().subscribe((todos: Todo[]) => this.todos = todos.map(todo => ({
      ...todo,
      datetime_created: todo.datetime_created ? new Date(todo.datetime_created) : null,
      datetime_due: todo.datetime_due ? new Date(todo.datetime_due) : null
    })));
  }

  addTodo(name: string, datetime_due: string, details: string): void{
    if(name){
      this.todoService.addTodo(name, datetime_due, details).subscribe((todo: Todo) => {
        todo = {...todo,
        datetime_created: todo.datetime_created ? new Date(todo.datetime_created) : null,
        datetime_due: todo.datetime_due ? new Date(todo.datetime_due) : null}
        this.todos.push(todo);
      });
      this.fetchTodos();
    }
    
  }
}
