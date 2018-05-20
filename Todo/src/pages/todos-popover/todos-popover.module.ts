import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodosPopOverPage } from './todos-popover';

@NgModule({
  declarations: [
    TodosPopOverPage,
  ],
  imports: [
    IonicPageModule.forChild(TodosPopOverPage),
  ],
})
export class TodosDonePageModule {}
