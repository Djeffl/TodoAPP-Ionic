import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Todo } from '../../models/todo';
import { Database } from '../../providers/database';
//import { TodoDataProvider } from '../../providers/todo-data/todo-data';

@IonicPage()
@Component({
  selector: 'page-todo-detail',
  templateUrl: 'todo-detail.html',
})
export class TodoDetailPage {
  todo: Todo;
  type: string;
  defaultTodo: any = {
    name: "todoName",
    time: "24:00"
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: Database) {
    this.todo = navParams.get("todo") || this.defaultTodo;
    this.type = this.todo.type;
    this.database.readSubtasks(this.todo).then((subtasks) => {
      this.todo.subtasks = subtasks;
    })
    .catch(err => {
      console.log(err);
    });
  }

  editTodo(event, todo) {
    this.navCtrl.push('TodoEditPage', {
      todo: todo
    });
  }

  completeSubTask(event, subTaskId) {
    // if(this.todo.subTasks[subTaskId].done) {
    //   this.todo.subTasks[subTaskId].done = false;
    //   this.todo.displayElement =  String(Number(this.todo.displayElement)+1);
    // } else {
    //   this.todo.subTasks[subTaskId].done = true;
    //   this.todo.displayElement =  String(Number(this.todo.displayElement)-1);
    // }
  }

  timer(todo) {
    var hoursMinutesSeconds = this.todo.timeLeft.split(":");
    var hours: any = hoursMinutesSeconds[0];
    var minutes: any = hoursMinutesSeconds[1];
    var seconds: any = hoursMinutesSeconds[2] || 60;

    if(seconds == 0) {
      minutes--;
      seconds = 60;
    }
    if(minutes == 0) {
      hours--;
      minutes = 59;
    }
    seconds--;

    todo.timeLeft = hours + ":" + minutes + ":" + seconds;

    // How to save
    // 1. Active timers continu saving in localfield



  }

  startCountDownTime() {


    setInterval(() => {this.timer(this.todo); }, 1000);
}


}
