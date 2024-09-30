import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Todo} from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiURL = 'http://localhost:3000/api/todos';

  constructor(private http: HttpClient) { }

  getTodos() : Observable<Todo[]>{
    return this.http.get<Todo[]>(this.apiURL);
  }

  addTodo(name: string, datetime_due: string, details: string) : Observable<Todo>{
    return this.http.post<Todo>(this.apiURL, {datetime_due: datetime_due, 
                                              name: name, 
                                              details: details});
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiURL}/${todo.id}`, todo);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    return this.http.delete<Todo>(`${this.apiURL}/${todo.id}`);
  }

}
