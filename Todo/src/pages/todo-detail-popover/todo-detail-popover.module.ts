import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoDetailPopOverPage } from './todo-detail-popover';

@NgModule({
  declarations: [
    TodoDetailPopOverPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoDetailPopOverPage),
  ],
})
export class TodosDonePageModule {}
