import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, PopoverController } from 'ionic-angular';
import { Database } from '../../providers/database/database';
import { Todo } from '../../models/todo';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private platform: Platform, private database: Database, private events: Events, private popoverCtrl: PopoverController, private storage: Storage) {
    this.platform.ready().then(() => {
      this.database.connectDb().then(() => {
        this.refreshData();
      });
    });

    this.events.subscribe('todo:isDirty', () => {
      this.refreshData();
    });
  }

  //Functions
  saveTodo(todo: Todo) {
    this.database.createTodo(todo).then(() => {
      this.refreshData();
    })
    .catch(err => {
      console.log(err);
    });
  }

  removeTodo(todo: Todo) {
    this.database.removeTodo(todo)
    .then(() => {
      this.refreshData();
    })
    .catch(err => {
      console.log(err);
    });
  }

  updateTodo(todo: Todo) {
    todo.done = true;
    todo.completedAt = new Date();
    this.database.updateTodo(todo)
    .then(() => {
      this.refreshData();
    })
    .catch(err => {
      console.log(err);
    });
  }

  refreshData() {
    this.storage.get("TodosFilter")
    .then(filter => {
      if(!filter) {
        filter = "WHERE done = 'false'";
      }
      console.log(filter);
      this.database.readTodos(filter)
      .then(todos => {
        this.todos = todos;
      });
    })
    .catch(err => {
      console.log(err);
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

  menuOptionClick(event) {
    let popover = this.popoverCtrl.create('TodosPopOverPage');
    //popover.present();
    popover.present({
      ev: event
    });
  }

  // listItemDrag(item, todo) {
  //   let percent = item.getSlidingPercent();
  //   // right side drag
  //   if (percent > 2.25) {
  //     // positive
  //     this.updateTodo(todo);
  //   }
  // }

  //reorderItems(indexes) {
    //this.todos = reorderArray(this.todos, indexes);

    // TODO: Save new ordered list
    //this.save

  //}

}
