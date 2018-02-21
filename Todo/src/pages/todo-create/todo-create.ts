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
}
