import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';



@NgModule({
  declarations: [
    TodoComponent,
    AppComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppModule { }
