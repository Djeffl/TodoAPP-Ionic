import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TodoDataProvider } from '../../providers/todo-data/todo-data';

/**
 * Generated class for the TodosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todos',
  templateUrl: 'todos.html',
})
export class TodosPage {
  selectedItem: any;
  todos: Array<{name: string, time: string}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public todoDataProv: TodoDataProvider) {
    this.todoDataProv.getData().then((todos) => {
      if(todos){
        this.todos = todos;
      }
    });
  }

  todoTap(event, todo) {
    this.navCtrl.push('TodoDetailPage', {
      todo: todo
    });
  }

  todoSwipe(event, todo) {
    console.log("HEY I'm deleting this");
    console.log(todo);
    this.removeTodo(todo);
  }

  addTodoFloatingActionButtonPressed(event) {
    let todoCreateModal = this.modalCtrl.create('TodoCreatePage');
    todoCreateModal.onDidDismiss(data => {
      if(data){
            this.saveTodo(data);
          }
    });
    todoCreateModal.present();
  }

  saveTodo(todo) {
    this.todos.push(todo);
    this.todoDataProv.save(this.todos);
  }

  removeTodoEvent(event, todo) {
    this.removeTodo(todo);
  }

  removeTodo(todo) {
    console.log("todosss removed Todo", todo);
    this.todos.forEach( (item, index) => {
     if(item === todo) this.todos.splice(index,1);
   });

   this.todoDataProv.save(this.todos);
  }

  listItemDrag(item, todo) {
    let percent = item.getSlidingPercent();
    // right side drag
    if (percent > 2) {
      // positive
      this.removeTodo(todo);
    }
  }

}
