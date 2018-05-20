import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Todo } from '../../models/todo';
import { Todo as TodoDB } from '../../models/database/todo';
import { Subtask } from '../../models/subtask';
import { Subtask as SubtaskDB} from '../../models/database/subtask';
import { Mapping, IResult } from './mappings/mapping';






@Injectable()
export class Database {
  protected logs: string = "Console Messages: ";
  private database: SQLiteObject;
  private config: any = {
    name: "demo.db",
    location: "default"
  };

  constructor(private sqlite: SQLite,  private mapping: Mapping) {
  }

  public connectDb(): Promise<any> {
    return this.sqlite.create(this.config)
      .then((db: SQLiteObject) => {
        this.database = db;
        //FOREIGN KEY(checklist_id) REFERENCES checklist(_id)
        let sqls = [];
        sqls.push('CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, type TEXT, name TEXT, done TEXT, createdAt TEXT, completedAt TEXT, typeParameter TEXT)');
        sqls.push('CREATE TABLE IF NOT EXISTS subtask (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, todoId INTEGER, name TEXT, done TEXT)');
        for(let sql of sqls){
          this.database.executeSql(sql, {})
            .then(() => {
              this.logs += 'Executed SQL' + sql;
              console.log("Connected");
            }).catch(err => { console.log("Not exectued create table sql: " + JSON.stringify(err)); });
          }
      })
      .catch((e) => {
        this.logs += JSON.stringify(e);
        console.log("Not connected");
      });
  }

  protected create(sql: string, params: any): Promise<number> {
    return this.database.executeSql(sql, params)
      .then((data) => {
        this.logs += "\n" + 'Insert SQL: ' + sql;
        return data.insertId;
      })
      .catch((err) => {
        this.logs += "Error: " + JSON.stringify(err);
        return err;
      });
  }

  protected read(sql: string, params: any): Promise<any> {
    return this.database.executeSql(sql, params)
      .then((data) => {
        this.logs += "\n" + 'Read SQL: ' + sql;
        let rows = data.rows;
        let rObject : Array<any> = [];
        for (let i = 0; i < rows.length; i++) {
          rObject.push(rows.item(i));
        }
        return rObject;
      })
      .catch((err) => {
        this.logs += "Error: " + JSON.stringify(err);
        console.log("Error sql: " + JSON.stringify(err));
        return err;
      });
  }

  protected delete(sql: string, params: any): Promise<any> {
    return this.database.executeSql(sql, params)
      .then((data) => {
        this.logs += "\n" + 'Delete SQL: ' + sql;
      })
      .catch((err) => {
        this.logs += "Error: " + JSON.stringify(err);
      });
  }

  protected update(sql: string, params: any): Promise<any> {
    console.log(sql);
    console.log(JSON.stringify(params));
    return this.database.executeSql(sql, params)
      .then((data) => {
        console.log("updated data:" + JSON.stringify(data));
        this.logs += "\n" + 'Update SQL: ' + sql;
      })
      .catch((err) => {
        console.log(err);
        this.logs += "Error: " + JSON.stringify(err);
      });
  }

  getLogs() {
    return this.logs;
  }

  public createTodo(todo: Todo): Promise<number> {
    let typeParameter: string;

    if(todo.type == "Time") {
      typeParameter = todo.timeLeft;
    }
    return this.create("INSERT INTO todo (id, type, name, done, createdAt, typeParameter) VALUES(?,?,?,?,?,?) ", [todo.id, todo.type, todo.name, todo.done, todo.createdAt, typeParameter])
      .then((id) => {
        if(todo.type == "Assignments") {
          this.createSubtasks(id, todo.subtasks);
        }
      })
      .catch(err => {
        return err;
      });
  }

  public readTodoById(id: number): Promise<Todo>{
    return this.readTodos("WHERE id = " + id)
    .then(todos => {
      let todo: Todo = todos[0];
      if(todo.type == "Assignments"){
        this.readSubtasks(todo.id);
      }
    })
    .catch(err => {
      return err;
    });
  }

  public readTodos(filter?: string): Promise<Array<Todo>>  {
    let sql = "SELECT * FROM todo";
    if(filter){
      sql += " " + filter;
    }
    return this.read(sql, {})
    .then(t => {
      console.log(JSON.stringify(t));
      let todos: Array<Todo> = this.mapping.mapTodos(t);
      for (let i in todos) {
        let todo : Todo = todos[i];
        if(todo.type == "Assignments") {
          this.readSubtasks(todo.id)
          .then(s => {
            todo.subtasks = s;
            let counterTasksLeft: number = 0;
            // For each subtask not done add it to the display element of the Assignments Todo
            for(let i in s){
              if(!s[i].done) {
                counterTasksLeft++;
              }
            }
            todo.displayElement = counterTasksLeft.toString();
          });
        }
        todos[i] = todo;
      }
      return todos;
    })
    .catch(err => {
      return err
    });
  }

  public removeTodo(todo: Todo): Promise<any> {
    return this.delete("DELETE FROM todo WHERE id = ?", [todo.id]);
  }

  public updateTodo(todo: Todo): Promise<any> {
    let result: IResult = this.mapping.mapTodoDB(todo);
    let todoDB: TodoDB = result.todo;
    let subtasksDB: Array<SubtaskDB> = result.subtasks;
    if(todo.type == "Assignments") {
      subtasksDB.forEach(subtask => {
        this.updateSubtaskDB(subtask);
      });
    }
    return this.update("UPDATE todo SET done = ?, completedAt = ?, typeParameter = ? WHERE id = ?", [todoDB.done, todoDB.completedAt, todoDB.typeParameter, todoDB.id]);
  }

  createSubtask(todoId: number, subtask: Subtask): Promise<number>{
    return this.create("INSERT INTO subtask (id, todoId, name, done) VALUES(?,?,?,?)", [subtask.id, todoId, subtask.name, subtask.done])
      .then((id) => {
        return id;
      })
      .catch(err => {
        return err;
      });
  }

  createSubtasks(todoId: number, subtasks: Array<Subtask>): Promise<number[]> {
     let promises = subtasks.map((subtask) => {
       return this.createSubtask(todoId, subtask);
     });
     return Promise.all(promises);
  }

  public readSubtasks(todoId: number): Promise<Array<Subtask>>  {
    let sql = "SELECT * FROM subtask WHERE todoId = ?";

    return this.read(sql,[todoId])
      .then((subtasks) => {
        return this.mapping.mapSubtasks(subtasks);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  updateSubtask(subtask: Subtask): Promise<any> {
    let sql = "UPDATE subtask SET done = ?, name = ? WHERE id = ?";

    let subtaskDB: SubtaskDB = this.mapping.mapSubtaskDB(subtask);
    return this.update(sql, [subtaskDB.done, subtaskDB.name, subtaskDB.id]);
  }

  updateSubtaskDB(subtask: SubtaskDB): Promise<any> {
    let sql = "UPDATE subtask SET done = ?, name = ? WHERE id = ?";
    return this.update(sql, [subtask.done, subtask.name, subtask.id]);
  }

}
