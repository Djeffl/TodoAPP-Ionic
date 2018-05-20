import { Component } from '@angular/core';
import { IonicPage, NavParams, Events, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Todo } from '../../models/todo';
import { Dialogs } from '@ionic-native/dialogs';

/**
 * Generated class for the OptionsMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  template: `
    <ion-list>
        <button ion-item (click)="optionClicked($event, 'editTodo')">Edit</button>
        <button ion-item (click)="optionClicked($event, 'addSubtask')" [disabled]="isDisabled">Add Subtask</button>
        <button ion-item (click)="optionClicked($event, 'deleteTodo')">Delete</button>
    </ion-list>
  `
})
export class TodoDetailPopOverPage {
  isDisabled : boolean;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private storage: Storage,  private events: Events, private dialogs: Dialogs) {
    this.isDisabled = this.viewCtrl.data.todo.type != "Assignments";
  }

  ionViewDidLoad() {
  }

  optionClicked($event, name){
    let data = {
      func: name
    };
    this.viewCtrl.dismiss(data);
  }

}
