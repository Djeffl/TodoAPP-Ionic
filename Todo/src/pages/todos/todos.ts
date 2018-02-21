import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TodoDataProvider } from '../../providers/todo-data/todo-data';
import { Todo } from '../../models/todo';
import { reorderArray } from 'ionic-angular';

/**
 * Generated class for the TodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {
  selectedItem: any;
  todos: Array<Todo> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public todoDataProv: TodoDataProvider) {
    this.todoDataProv.getTodosNotDone().then((todos) => {
      this.todos = todos;
    });
  }

  //Functions
  saveTodo(todo) {
    this.todoDataProv.saveTodo(todo).then(() => {
      this.todoDataProv.getTodosNotDone().then((todos) => {
        this.todos = todos;
      });
    });
  }

  removeTodo(todo) {
    this.todoDataProv.deleteTodo(todo.id).then(() => {
      this.todoDataProv.getTodosNotDone().then((todos) => {
        this.todos = todos;
      });
    });
  }

  updateTodo(todo) {
    todo.done = true;
    todo.completedAt = new Date();
    this.todoDataProv.update(todo).then(() => {
      this.todoDataProv.getTodosNotDone().then((todos) => {
        this.todos = todos;
      });
    });
  }


  //Events
  deleteEvent(event, todo) {
    this.removeTodo(todo);
  }
  completeEvent(event, todo) {
    this.updateTodo(todo);
  }

  todoTap(event, todo) {
    this.navCtrl.push('TodoDetailPage', {
      todo: todo
    });
  }

  addTodoFloatingActionButtonPressed(event)  {
    let todoCreateModal = this.modalCtrl.create('TodoCreatePage');
    todoCreateModal.onDidDismiss(todo => {
      if (todo) {
        this.saveTodo(todo);
      }
    });
    todoCreateModal.present();
  }

  listItemDrag(item, todo) {
    let percent = item.getSlidingPercent();
    // right side drag
    if (percent > 2.25) {
      // positive
      this.updateTodo(todo);
    }
  }

  reorderItems(indexes) {
    this.todos = reorderArray(this.todos, indexes);

    // TODO: Save new ordered list
    //this.save

  }

}
