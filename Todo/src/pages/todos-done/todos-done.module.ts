import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodosDonePage } from './todos-done';

@NgModule({
  declarations: [
    TodosDonePage,
  ],
  imports: [
    IonicPageModule.forChild(TodosDonePage),
  ],
})
export class TodosDonePageModule {}
