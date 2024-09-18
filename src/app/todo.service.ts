import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiURL = 'http://localhost:3000/api/todos';

  constructor(private http: HttpClient) { }

  getTodos() : Observable<Todo[]>{
    return this.http.get<Todo[]>(this.apiURL);
  }

  addTodo(name: string, datetime_due: Date | null, details: string) : Observable<Todo>{
    return this.http.post<Todo>(this.apiURL, {datetime_due: datetime_due, 
                                              name: name, 
                                              details: details});
  }
}
