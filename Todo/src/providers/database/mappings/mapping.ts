import { Injectable } from '@angular/core';
import { Todo as TodoDB } from '../../../models/database/todo';
import { Todo } from '../../../models/todo';
import { Subtask } from '../../../models/subtask';
import { Subtask as SubtaskDB } from '../../../models/database/subtask';

export interface IResult {
  todo: TodoDB,
  subtasks: Array<SubtaskDB>
}

@Injectable()
export class Mapping {
  public mapTodos(todosDB: Array<TodoDB>): Array<Todo>{
    let rTodos: Array<Todo> = [];
    todosDB.forEach(todoDB => {
      rTodos.push(this.mapTodo(todoDB));
    });
    return rTodos;
  }

  public mapTodo(todoDB: TodoDB): Todo {
      let createdAt : Date = new Date(todoDB.createdAt);
      let completedAt: Date = new Date(todoDB.completedAt);
      let done: boolean = todoDB.done == "true" ? true : false;
      if( createdAt.getTime() == new Date("").getTime()) { createdAt = null; }
      if( completedAt.getTime() == new Date("").getTime()) { completedAt = null; }

      return new Todo(todoDB.id, todoDB.type, todoDB.name, done, createdAt, completedAt, todoDB.typeParameter)
  }

  public mapTodoDB(todo: Todo): IResult {
    let done: string = todo.done ? "true" : "false";
    let createdAt: string = todo.createdAt.toString();
    let completedAt: string = todo.completedAt.toString();

    if(todo.type == "Assignments") {
      let subtasks: Array<Subtask>;
      if(todo.subtasks) {
        subtasks = todo.subtasks;
      } else {
        subtasks = [];
      }
      return {
        todo: new TodoDB(todo.id, todo.type, todo.name, done, createdAt, completedAt, null),
        subtasks: this.mapSubtasksDB(subtasks)
      };
    }
    if(todo.type == "Time") {
      return {
        todo: new TodoDB(todo.id, todo.type, todo.name, done, createdAt, completedAt, todo.timeLeft),
        subtasks: null
      }
    } else {
      return {
        todo: new TodoDB(todo.id, todo.type, todo.name, done, createdAt, completedAt, null),
        subtasks: null
      }
    }
  }

  public mapSubtask(subtaskDB: SubtaskDB): Subtask {
    let done : boolean = subtaskDB.done == "true" ? true : false;

    return new Subtask(subtaskDB.id, subtaskDB.todoId, subtaskDB.name, done);
  }

  public mapSubtasks(subtasksDB: Array<SubtaskDB>): Array<Subtask> {
    let rSubtasks: Array<Subtask> = [];
    subtasksDB.forEach(subtaskDB => {
      rSubtasks.push(this.mapSubtask(subtaskDB));
    });
    return rSubtasks;
  }

  public mapSubtaskDB(subtask: Subtask): SubtaskDB {
    let done : string = subtask.done ? "true" : "false";

    return new SubtaskDB(subtask.id, subtask.todoId, subtask.name, done);
  }

  public mapSubtasksDB(subtasks: Array<Subtask>): Array<SubtaskDB> {
    let rSubtasksDB: Array<SubtaskDB> = [];
    subtasks.forEach(subtask => {
      rSubtasksDB.push(this.mapSubtaskDB(subtask));
    });
    return rSubtasksDB;
  }
}
