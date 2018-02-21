import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TodoDataProvider } from '../../providers/todo-data/todo-data';
import { Todo } from '../../models/todo';
/**
 * Generated class for the TodosDonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todos-done',
  templateUrl: 'todos-done.html',
})
export class TodosDonePage {
  todos: Array<Todo> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public todoDataProv: TodoDataProvider) {
    this.todoDataProv.getTodosDone().then((todos) => {
      this.todos = this.sortArrayByDate(todos);
    });
  }


  sortArrayByDate(todos: Array<Todo>) {
    var length = todos.length;
    //Bubble sort
    for(let i = 1; i < length;i++) {
      for(var j = 0;j < length - i;j++) {
        if(todos[j].completedAt < todos[j+1].completedAt){
          // Swap
          var temp = todos[j];
          todos[j] = todos[j+1];
          todos[j + 1] = temp;
        }
      }
    }
    return todos;
  }


}
