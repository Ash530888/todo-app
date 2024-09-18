import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // Replace CommonModule with BrowserModule
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TodoComponent,
    AppComponent
  ],
  imports: [
    BrowserModule, // This is the root module, so use BrowserModule
    RouterModule.forRoot([]) // RouterModule to handle routing
  ],
  bootstrap: [AppComponent] // Make sure AppComponent is bootstrapped
})
export class AppModule { }
