import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Database } from '../../providers/database';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private database: Database) {
    
  }

  //Functions
  saveTodo(todo: Todo) {
    this.database.create("INSERT INTO todo (id, type, name, done, createdAt) VALUES(?,?,?,?,?) ", (todo.id, todo.type, todo.name, todo.done, todo.createdAt))
    .then(() => {
    })
    .catch(err => {
    });
  }

  removeTodo(todo: Todo) {
    this.database.delete("DELETE FROM todo WHERE id = ?", (todo.id));
  }

  updateTodo(todo: Todo) {
    todo.done = true;
    todo.completedAt = new Date();
    this.database.update("UPDATE todo SET done = ?, completedAt = ? where id = ?", (todo.done, todo.completedAt, todo.id));
  }

  refreshData() {
    this.database.read("SELECT * FROM todo", {})
    .then((todos) => {
      this.todos = todos;
    })
    .catch(err => {
      
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
