import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Todo } from '../../models/todo';
import { Database } from '../../providers/database/database';
import { Subtask } from '../../models/subtask';

/**
 * Generated class for the TodoEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo-edit',
  templateUrl: 'todo-edit.html',
})
export class TodoEditPage {

  todo: Todo;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: Database) {
    this.todo = this.navParams.get("todo");
    console.log("id: " + this.todo.id);
  }

  ionViewDidLoad() {
  }

  saveEditTodoButtonPressed(event) {
    console.log(JSON.stringify("TODO-EDIT TODO: " + JSON.stringify(this.todo)));
    this.database.updateTodo(this.todo)
    .then(() => {
      this.navCtrl.pop();
    })
    .catch(() => {
      console.log("err");
    })
  }

  inputChanged(id) {
    //Add new field if all fields are filled in
    if(this.todo.subtasks[id].name != "" && id == this.todo.subtasks.length-1 ) {
      this.todo.subtasks.push(new Subtask(null,this.todo.id,"", false));
    }
    // Remove field if it's empty
    else if(this.todo.subtasks[id].name == "" && id < this.todo.subtasks.length-1) {
      this.todo.subtasks.splice(id, 1);
    }
  }

}
