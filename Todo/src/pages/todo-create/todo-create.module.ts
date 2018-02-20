import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoCreatePage } from './todo-create';

@NgModule({
  declarations: [
    TodoCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TodoCreatePage),
  ],
})
export class TodoCreatePageModule {}
