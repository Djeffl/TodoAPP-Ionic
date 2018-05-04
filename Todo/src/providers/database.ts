import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { Todo } from '../models/todo';
import { Subtask } from '../models/subtask';






@Injectable()
export class Database {
  protected logs: string = "Console Messages: ";
  private database: SQLiteObject;
  private config: any = {
    name: "demo.db",
    location: "default"
  };

  constructor(private sqlite: SQLite, private platform: Platform) {
  }

  public connectDb(): Promise<any> {
    console.log("HEY IN CONNECTDB");
    return this.sqlite.create(this.config)
      .then((db: SQLiteObject) => {
        console.log("start connections");
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

  protected create(sql: string, params: any): Promise<any> {
    return this.database.executeSql(sql, params)
      .then((data) => {
        console.log(data);
        this.logs += "\n" + 'Insert SQL: ' + sql;
        return data;
      })
      .catch((err) => {
        console.log(err);
        this.logs += "Error: " + JSON.stringify(err);
        return err;
      });
  }

  protected read(sql: string, params: any): Promise<any> {
    return this.database.executeSql(sql, params)
      .then((data) => {
        this.logs += "\n" + 'Read SQL: ' + sql;
        console.log("Read sql: " + sql);
        return data;

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
    return this.database.executeSql(sql, params)
      .then((data) => {
        this.logs += "\n" + 'Update SQL: ' + sql;
      })
      .catch((err) => {
        this.logs += "Error: " + JSON.stringify(err);
      });
  }

  getLogs() {
    return this.logs;
  }

  public createTodo(todo: Todo): Promise<any> {
    return this.create("INSERT INTO todo (id, type, name, done, createdAt) VALUES(?,?,?,?,?) ", [todo.id, todo.type, todo.name, todo.done, todo.createdAt])
      .then(() => {
        console.log("Saved");
      })
      .catch(err => {
        console.log("failed: " + err);
      });
  }

  public readTodos(filter?: string): Promise<any>  {
    let todos: Todo[] = [];
    let sql = "SELECT * FROM todo";
    if(filter){
      sql += " " + filter;
    }


    return this.read(sql, {})
      .then((data) => {
        let rows = data.rows;
        for (let i = 0; i < rows.length; i++) {
          rows.item(i).completedAt = new Date(rows.item(i).completedAt);
          todos.push(rows.item(i));
        }
        return todos;
      });
  }

  public removeTodo(todo: Todo): Promise<any> {
    return this.delete("DELETE FROM todo WHERE id = ?", [todo.id]);
  }

  public updateTodo(todo: Todo): Promise<any> {
    return this.update("UPDATE todo SET done = ?, completedAt = ? where id = ?", [true, todo.completedAt, todo.id]);

  }

  createSubTask(subTask: Subtask){
    return this.create("INSERT INTO subtask (id, todoId, name, done) VALUES(?,?,?,?) ", [subTask.id, subTask.todoId, subTask.name, subTask.done])
      .then(() => {
        console.log("Saved subtask");
      })
      .catch(err => {
        console.log("failed: " + err);
      });
  }

  public readSubtasks(todo: Todo): Promise<any>  {
    let subtasks = [];

    let sql = "SELECT * FROM subtask where todoId = ?";

    console.log(todo.id);
    return this.read(sql, todo.id)
      .then((data) => {
        let rows = data.rows;
        console.log("rows: " + rows.length);
        for (let i = 0; i < rows.length; i++) {
          subtasks.push(rows.item(i));
        }
        console.log(JSON.stringify(subtasks));
        return subtasks;
      })
      .catch(err => {
        console.log(err);
      });
  }

}
