import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Database } from '../../providers/database/database';
import { Platform } from 'ionic-angular';
import { Todo } from '../../models/todo';
/**
 * Generated class for the TodosDonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todos-done',
  templateUrl: 'todos-done.html',
})
export class TodosDonePage {
  groups: Array<{ date: string, todos: Array<Todo>}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private database :Database) {
    this.platform.ready().then(() => {
      this.database.connectDb().then(() => {
        this.refreshData();
      });
    });
  }

  refreshData() {
    this.database.readTodos("WHERE done = 'true'")
    .then(todos => {
      console.log(JSON.stringify(todos));

      this.groups = this.convertToDisplayTodos(this.sortArrayByDate(todos));
    })
    .catch(err => {
      console.log(err);
    })
  }


  sortArrayByDate(todos: Array<Todo>): Array<Todo> {
    var length = todos.length;
    //Bubble sort
    for(let i = 1; i < length;i++) {
      for(var j = 0;j < length - i;j++) {
        if(todos[j].completedAt < todos[j+1].completedAt){
          // Swap
          var temp = todos[j];
          todos[j] = todos[j+1];
          todos[j + 1] = temp;
        }
      }
    }
    return todos;
  }

  convertToDisplayTodos(todos: Array<Todo>) {
    todos = this.sortArrayByDate(todos);
    // Create displayDate
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var nextTodoHasSameDate: boolean;
    var currentTodoDate: Date;
    var nextTodoDate: Date;
    var displayDate: string;
    var todosgroup: Array<Todo> = [];
    var index = 0;
    var displayTodos: Array<{date: string, todos: Array<Todo>}> = [];

    while(index < todos.length) {
      // Reset todosgroup
      todosgroup = [];
      // Get current todo
      var currentTodo: Todo = todos[index];
      // Get todo completion date
      currentTodoDate = currentTodo.completedAt;

      // Compare the days/year/month with eachother
      var currentTodoDay = currentTodoDate.getDate();
      var currentTodoMonth = currentTodoDate.getMonth();
      var currentTodoYear = currentTodoDate.getFullYear();

      // Compose date to display in html (eg: 24 August 2017)
      displayDate = currentTodoDay + " " + monthNames[currentTodoMonth] + " " + currentTodoYear;

      // Next todo variables
      var nextTodo: Todo;
      var nextTodoDay;
      var nextTodoMonth;
      var nextTodoYear;

      // Push currentTodo to group Date todos
      todosgroup.push(currentTodo);

      // While same date loop
      do {
        // Check if last todo or not
        if (index < todos.length - 1){
          // Get next todo completion date
          nextTodo      =  todos[index+1];
          nextTodoDate  =  nextTodo.completedAt;
          nextTodoDay   =  nextTodoDate.getDate();
          nextTodoMonth =  nextTodoDate.getMonth();
          nextTodoYear  =  nextTodoDate.getFullYear();

          // if match add to list of todos of currentDate
          if(currentTodoYear == nextTodoYear && currentTodoMonth == nextTodoMonth && currentTodoDay == nextTodoDay) {
            //
            todosgroup.push(nextTodo);
            nextTodoHasSameDate = true;
          }
          // If not add todos list to displayTodos as group with currentDate
          else {
            displayTodos.push({ date: displayDate, todos: todosgroup });
            nextTodoHasSameDate = false;
          }
        }
        // If last item push it into list
        else {
          displayTodos.push({ date: displayDate, todos: todosgroup });
          nextTodoHasSameDate = false;
        }
        index++;
      }
      while(nextTodoHasSameDate);
    }
    return displayTodos;
  }

  undoClick(event, todo) {
    todo.done = false;
    this.database.updateTodo(todo)
    .then(() => {
      this.refreshData();
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
