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
  type: string = "Basic";
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

    //Capitilize first char
    this.name = this.name.charAt(0).toUpperCase() + this.name.substr(1);

    if(this.type == "Basic") {
      // constructor(id: string, type: string, name:string, done: boolean, createdAt: Date)
      this.viewCtrl.dismiss(
        new Todo(
          UUID.UUID(),
          this.type,
          this.name,
          false,
          new Date()
        )
      );
    }
    else if(this.type == "Time") {
      // constructor(id: string, type: string, name: string, done: boolean, createdAt: Date, startTime: string)

      if(this.startTime == "00:00" || this.startTime == "" || this.startTime == undefined) {
        this.showErrorToast("The minimum time is atleast 15 minutes");
        return;
      }

      this.viewCtrl.dismiss(
        new Todo(
          UUID.UUID(),
          this.type,
          this.name,
          false,
          new Date(),
          this.startTime
        )
      );
    }
    else if(this.type == "Assignments") {
      // constructor(id: string, type: string, name: string, done: boolean, createdAt: Date, subTasks: Array<string>)
      if(this.assignments.length == 1) {
        this.showErrorToast("Fill in atleast 1 task");
        return;
      }
      // Remove empty data row
      this.assignments.splice(-1,1);

      this.viewCtrl.dismiss(
        new Todo(
          UUID.UUID(),
          this.type,
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
