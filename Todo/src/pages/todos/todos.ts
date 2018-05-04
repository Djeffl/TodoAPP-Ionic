import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Database } from '../../providers/database';
import { Todo } from '../../models/todo';
import { Subtask } from '../../models/subtask';
import { reorderArray } from 'ionic-angular';
import { Platform } from 'ionic-angular';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private platform: Platform, private database: Database) {
    this.platform.ready().then(() => {
      this.database.connectDb().then(() => {
        this.refreshData();
      });
    });
  }

  //Functions
  saveTodo(todo: Todo) {
    if(todo.type == "Assignments") {
      console.log(JSON.stringify(todo.subtasks));
      for(let i = 0; i < todo.subtasks.length; i++){
        let subtask: Subtask = todo.subtasks[i];
        this.database.createSubTask(subtask).then(() => {
          console.log(JSON.stringify(subtask) + " saved.");
        }).catch(err => {
          console.log(err);
        });
      }
    }
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
    this.database.readTodos("WHERE done = 'false'")
    .then(todos => {
      console.log(JSON.stringify(todos));
      this.todos = todos;
    })
    .catch(err => {
      console.log(err);
    })
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

  //reorderItems(indexes) {
    //this.todos = reorderArray(this.todos, indexes);

    // TODO: Save new ordered list
    //this.save

  //}

}
