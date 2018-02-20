import { Injectable } from '@angular/core';

@Injectable()
export class TodosData {
  todos: any[] = [];

  constructor() {
    let todos = [
      {
        "name": "Burt Bear 1",
        "time": "01:00"
      },
      {
        "name": "Burt Bear 2",
      },
      {
        "name": "Burt Bear 3",
        "time": "04:00"
      },
      {
        "name": "Burt Bear 4",
        "time": "12:30"
      },
      {
        "name": "Burt Bear 5",
        "time": "00:30"
      },
    ];

    for (let todo of todos) {
      this.todos.push(todo);
    }
  }

  // query(params?: any) {
  //   if (!params) {
  //     return this.items;
  //   }
  //
  //   return this.items.filter((item) => {
  //     for (let key in params) {
  //       let field = item[key];
  //       if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
  //         return item;
  //       } else if (field == params[key]) {
  //         return item;
  //       }
  //     }
  //     return null;
  //   });
  // }

  add(todo: any) {
    this.todos.push(todo);
  }

  delete(todo: any) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }
}
