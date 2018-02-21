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
      this.todos = todos;
    });
  }


}
