import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import $ from 'jquery';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit{
  todos: Todo[] = [];
  selectedTodo: Todo|null = null;

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

  openModal(todo: Todo) {
    this.selectedTodo = { ...todo }; // Clone to avoid direct mutation
    const modal = document.getElementById('todoModal');
    if(modal) modal.style.display = 'block';
    
  }

  closeModal() {
    const modal = document.getElementById('todoModal');
    if(modal) modal.style.display = 'none';
    
  }



  updateTodo() {
    if(this.selectedTodo){
      this.todoService.updateTodo(this.selectedTodo)
          .subscribe(response => {
              console.log('Todo updated successfully:', response);
              this.fetchTodos(); // Fetch the latest todos
              this.closeModal();
          }, error => {
              console.error('Error updating todo:', error);
          });
    }
  }

  deleteTodo(todo: Todo){
    this.todoService.deleteTodo(todo)
    .subscribe(response => {
        console.log('Todo deleted successfully:', response);
        this.fetchTodos(); // Fetch the latest todos
    }, error => {
        console.error('Error deleting todo:', error);
    });
  }

  
}
