import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
        <ion-list-header>Display types</ion-list-header>
        <div id="typeIcons">
        <button [attr.display]="timeDisplay" [attr.type]="'Time'" (click)="changeDisplay($event)">
          <ion-icon name="timer" class="todoIcon"></ion-icon>
        </button>
        <button [attr.display]="assignmentsDisplay" [attr.type]="'Assignments'" (click)="changeDisplay($event)">
          <ion-icon name="list" class="todoIcon"></ion-icon>
        </button>
        <button [attr.display]="basicDisplay" [attr.type]="'Basic'" (click)="changeDisplay($event)">
          <ion-icon name="clipboard" class="todoIcon"></ion-icon>
        </button>
        </div>
        <hr style="border-width: 0.1px;">
    </ion-list>
  `
})
export class TodosPopOverPage {

  timeDisplay : boolean;
  basicDisplay: boolean;
  assignmentsDisplay: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,  private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsMenuPage');
    this.storage.get("TodosFilter")
    .then(filter => {
      this.timeDisplay = true;
      this.basicDisplay = true;
      this.assignmentsDisplay = true;
      if(filter) {
        if(!filter.includes("type='Time'")){
          this.timeDisplay = false;
        }
        if(!filter.includes("type='Assignments'")){
          this.assignmentsDisplay = false;
        }
        if(!filter.includes("type='Basic'")){
          this.basicDisplay = false;
        }

      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  changeDisplay(element: any) {
    let display = element.currentTarget.getAttribute("display");
    let type = element.currentTarget.getAttribute("type");

    if(type == "Time") {
      this.timeDisplay = !this.timeDisplay;
    } else if(type == "Assignments") {
      this.assignmentsDisplay = !this.assignmentsDisplay;
    } else if(type == "Basic") {
      this.basicDisplay = !this.basicDisplay;
    }

    let filter = " WHERE done= 'false' AND (1 = 0";

    if(this.timeDisplay) {
      filter += " OR type='Time'";
    }
    if(this.basicDisplay) {
      filter += " OR type='Basic'";
    }
    if(this.assignmentsDisplay) {
      filter += " OR type='Assignments'";
    }
    filter+= ")";
    
    this.storage.set("TodosFilter", filter)
    .then(() => {
      this.events.publish("todo:isDirty", {});
    })
    .catch(err => {
      // Show that filter could not be used
      console.log(err);
    });

  //   if(display == true) {
  //     element.currentTarget.setAttribute("display", 'false');

  //   } else {
  //     element.currentTarget.setAttribute("display", 'true');
  //   }
  }

}
