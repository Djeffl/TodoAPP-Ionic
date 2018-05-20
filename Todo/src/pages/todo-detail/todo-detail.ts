import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, PopoverController } from 'ionic-angular';
import { Todo } from '../../models/todo';
import { Database } from '../../providers/database/database';
import { Subtask } from '../../models/subtask';
import { Dialogs } from '@ionic-native/dialogs';


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
  isDirty: boolean = false;

  refreshIntervalId: any;
  countDownText: string = "Start!";

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: Database, private toastCtrl: ToastController, private events: Events, private popoverCtrl: PopoverController, private dialogs: Dialogs) {
    this.todo = navParams.get("todo") || this.defaultTodo;
    this.type = this.todo.type;
  }

  ionViewCanLeave(): boolean{
    // here we can either return true or false
    // depending on if we want to leave this view
    if(this.refreshIntervalId){
      this.showErrorToast("Timer still running.");
      return false;
    } else {
      return true;
    }
  }

  ionViewWillLeave() {
    if(this.isDirty) {
      this.events.publish('todo:isDirty', null);
    }
  }

  completeTodo(event) {
    this.dialogs.confirm("Are you sure?", "Complete")
    .then(r => {
      if(r == 1) {
        // Complete task
      }
    })
    .catch(err => {
      
    });
  }

  completeSubtask(event, subtaskId) {
    let subtask : Subtask = this.todo.subtasks[subtaskId];

    if(subtask.done) {
      subtask.uncomplete();
    } else {
      subtask.complete();
    }
    this.database.updateSubtask(subtask);
    this.isDirty = true;
  }

  timer(todo) {
    let hoursMinutesSeconds = this.todo.timeLeft.split(":");
    let hours: any = hoursMinutesSeconds[0];
    let minutes: any = hoursMinutesSeconds[1];
    let seconds: any = hoursMinutesSeconds[2];

    if(!minutes || minutes == 0) {
      hours--;
      minutes = 60;
    }

    if(!seconds || seconds == 0) {
      minutes--;
      seconds = 60;
    }

    seconds--;

    if(hours == 0 && minutes == 0 && seconds == 0) {
      clearInterval(this.refreshIntervalId);
    }

    todo.timeLeft = hours + ":" + minutes + ":" + seconds;
  }

  startCountDownTime() {
    let hoursMinutesSeconds = this.todo.timeLeft.split(":");
    let hours: any = hoursMinutesSeconds[0];
    let minutes: any = hoursMinutesSeconds[1];
    let seconds: any = hoursMinutesSeconds[2];
    if(hours == 0 && minutes == 0 && seconds == 0) {
      this.countDownText = "Start!";
      this.showErrorToast("This task is finished!");
    } else {
      if(this.refreshIntervalId) {
        clearInterval(this.refreshIntervalId);
        this.refreshIntervalId = null;
        this.database.updateTodo(this.todo);
        this.countDownText = "Start!";
        this.isDirty = true;
      } else {
        this.countDownText = "Stop!";
        this.refreshIntervalId = setInterval(() => {this.timer(this.todo); }, 1000);
      }
    }
  }

  showErrorToast(errorMsg: string) {

    let toast = this.toastCtrl.create({
      message: errorMsg,
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
  }

  menuOptionClick(event) {
    let popover = this.popoverCtrl.create('TodoDetailPopOverPage', {todo: this.todo});
    //popover.present();
    popover.present({
      ev: event
    });

    popover.onDidDismiss(data => {
      if(data){
        let func = data.func;

        console.log(func);
        if(func == "addSubtask") {
          this.addSubtask();
        }
        else if(func == "deleteTodo") {
          this.deleteTodo();
        }
        else if(func == "editTodo") {
          this.editTodo();
        }
      }
    });
  }

  addSubtask() {
    this.dialogs.prompt("Fill in the name: ", "Add Subtask", ["Add", "Cancel"])
    .then(data => {
      console.log(JSON.stringify(data));
      if(data.buttonIndex == 1 && (data.input1 != "" && data.input1 != null)) {
        let subtask: Subtask = new Subtask(null, this.todo.id, data.input1, false);
        this.todo.subtasks.push(subtask);
        this.database.createSubtask(this.todo.id, subtask);
        this.isDirty = true;
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  deleteTodo() {
    this.dialogs.confirm("Are you sure?", "Delete", ["Yes", "Cancel"])
        .then(d => {
          if(d == 1) {
            this.database.removeTodo(this.todo)
            .then(() => {
              this.isDirty = true;
              this.navCtrl.pop();
            });
          }
        })
        .catch(err => {
          console.log(err);
        })
  }

  editTodo() {
    console.log("editoto");
    let data = {
      todo: this.todo
    }
    this.navCtrl.push("TodoEditPage", data);
  }


}
