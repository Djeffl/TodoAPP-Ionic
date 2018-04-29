import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';






@Injectable()
export class Database {
    protected logs: string = "Console Messages: ";
    private database: SQLiteObject;
    private config: any = {
        name: "data.db", 
        location: "default"
    };

    constructor(private sqlite: SQLite, private platform: Platform) { 
        this.platform.ready().then(() => {
            this.connectToDb();
        });
    }

    private connectToDb():void {
         this.sqlite.create(this.config)
             .then((db: SQLiteObject) => {
    
                 this.database = db;
                 var sql = 'create table IF NOT EXISTS `todo` (id VARCHAR(255), type VARCHAR(255), name VARCHAR(255), done: Integer, createdAt: VARCHAR(255),  typeParameter: VARCHAR(255))'; //id: string, type: string, name:string, done: boolean, createdAt: Date, typeParameter?: any
                 //IF you move the below statment out of here then the db variable will not be initialized
                 //before you can use it to execute the SQL. 
                 this.database.executeSql(sql, {})
                 .then(() => this.logs += 'Executed SQL' + sql)
                 .catch(e => this.logs += "Error: " + JSON.stringify(e));
             })
             .catch(e => this.logs += JSON.stringify(e));
     }

    public create(sql: string, params: any): Promise<any> {       
      return this.database.executeSql(sql, params)
       .then((data) => {
           this.logs += "\n" + 'Insert SQL: ' + sql;
           return data;
       })
       .catch((err) => {
           this.logs += "Error: " + JSON.stringify(err);
           return err;
       });
    }

    public read(sql: string, params: any): Promise<any> {
        return this.database.executeSql(sql, params)
        .then((data) => {
            this.logs += "\n" + 'Read SQL: ' + sql;
            return data;
             
        })
        .catch((err) => {
            this.logs += "Error: " + JSON.stringify(err);
            return err;
        });
    }

    public delete(sql: string, params: any) {
        this.database.executeSql(sql, params)
        .then((data) => {
            this.logs += "\n" + 'Delete SQL: ' + sql;
        })
        .catch((err) => {
            this.logs += "Error: " + JSON.stringify(err);
        });
    }

    public update(sql: string, params: any): any {
        this.database.executeSql(sql, params)
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

    public refresh() {
    }

}
