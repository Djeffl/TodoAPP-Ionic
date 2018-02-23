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
  assignments: [{name: string}] = [{name: ""}];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl :ViewController, public toastCtrl: ToastController) {

  }

  createTodoFloatingActionButtonPressed(event) {
    // Show Toast when name is empty
    if(!Boolean(this.name)) {
      this.showErrorToast();
      return
    }

    this.viewCtrl.dismiss(
      new Todo(
        UUID.UUID(),
        this.name,
        this.time || "-",
        false,
        new Date()
      )
    );
  }

  showErrorToast() {

    let toast = this.toastCtrl.create({
      message: 'Please provide a name',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  inputChanged(id) {
    // Add new field if all fields are filled in
    if(this.assignments[id].name != "" && id == this.assignments.length-1 ) {
      this.assignments.push({name: ""});
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
