import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Todo } from '../../models/todo';

/*
  Generated class for the TodoDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoDataProvider {

  constructor(private storage: Storage) {
  }

  saveTodo(todo: Todo) {
    return this.getAll().then((todos) => {
      todos.push(todo);
      this.save(todos);
    });
  }

  save(todos: Array<Todo>) {
    return this.storage.set('todos', todos);
  }

  getAll() {
    console.log("in getAll");
    return this.storage.get('todos');
  }

  getTodosNotDone() {
    var todosNotDone : Array<Todo> = [];
    return this.getAll().then((todos) => {
       if(!todos) {
         return [];
       }
      for(var i = 0; i < todos.length; i++) {
        if(!todos[i].done) {
          todosNotDone.push(todos[i])
        }
      }
      return todosNotDone;
    });
  }

  deleteTodo(todoId: string) {
    return this.getAll().then((todos) => {
      for(var i = 0; i < todos.length; i++) {
        if(todos[i].id == todoId) {
          todos.splice(i, 1);
          this.save(todos);
        }
      }
    });
  }

  getTodosDone() {
    var todosDone : Array<Todo> = [];
    return this.getAll().then((todos) => {
       if(!todos) {
         return [];
       }
      for(var i = 0; i < todos.length; i++) {
        if(todos[i].done) {
          todosDone.push(todos[i])
        }
      }
      return todosDone;
    });
  }

  update(todo: Todo) {
    return this.getAll().then((todos) => {
      if(!todos) { return; }
      for(var i = 0; i < todos.length;i++) {
        if(todos[i].id === todo.id) {
          todos[i] = todo;
          break;
        }
      }
      this.save(todos);
    });
  }
}
