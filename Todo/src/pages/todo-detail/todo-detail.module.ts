import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoDetailPage } from './todo-detail';

@NgModule({
  declarations: [
    TodoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoDetailPage),
  ],
})
export class TodoDetailPageModule {}
