import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // Replace CommonModule with BrowserModule
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  providers: [provideHttpClient()],
  declarations: [
    TodoComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [AppComponent] // Make sure AppComponent is bootstrapped
})
export class AppModule { }
