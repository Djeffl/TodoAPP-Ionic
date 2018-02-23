import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Todo } from '../../models/todo';
import { UUID } from 'angular2-uuid';

@IonicPage()
@Component({
  selector: 'page-todo-create',
  templateUrl: 'todo-create.html',
})
export class TodoCreatePage {
  time: string;
  name: string;
  type: string = "basic";
  assignments: [{name: string, done: boolean}] = [{ name: "", done: false }];
  startTime: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl :ViewController, public toastCtrl: ToastController) {

  }

  createTodoButtonPressed(event) {
    // Show Toast when name is empty
    if(!Boolean(this.name)) {
      this.showErrorToast('Please provide a name');
      return;
    }
    if(type == "basic") {
      // constructor(id: string, type: string, name:string, done: boolean, createdAt: Date)
      this.viewCtrl.dismiss(
        new Todo(
          UUID.UUID(),
          "basic",
          this.name,
          false,
          new Date()
        )
      );
    }
    else if(type == "time") {
      // constructor(id: string, type: string, name: string, done: boolean, createdAt: Date, startTime: string)

      if(startTime == "00:00") {
        this.showErrorToast("The minimum time is atleast 15 minutes");
        return;
      }

      this.viewCtrl.dismiss(
        new Todo(
          UUID.UUID(),
          "time",
          this.name,
          false,
          new Date(),
          this.startTime
        )
      );
    }
    else if(type == "assignments") {
      // constructor(id: string, type: string, name: string, done: boolean, createdAt: Date, subTasks: Array<string>)
      this.assignments.splice(-1,1);
      if(assignments.length = 0) {
        this.showErrorToast("Fill in atleast 1 task");
        return;
      }
      this.viewCtrl.dismiss(
        new Todo(
          UUID.UUID(),
          "time",
          this.name,
          false,
          new Date(),
          this.assignments
        )
      );
    }



  }

  showErrorToast(errorMsg: string) {

    let toast = this.toastCtrl.create({
      message: errorMsg,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  inputChanged(id) {
    // Add new field if all fields are filled in
    if(this.assignments[id].name != "" && id == this.assignments.length-1 ) {
      this.assignments.push({ name: "", done: false });
    }
    // Remove field if it's empty
    else if(this.assignments[id].name == "" && id < this.assignments.length-1) {
      this.assignments.splice(id, 1);
    }
  }

  // Test
  // logData() {
  //   console.log(JSON.stringify(this.assignments));
  // }
}
