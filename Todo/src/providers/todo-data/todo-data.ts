import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the TodoDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoDataProvider {

  constructor(private storage: Storage) {
  }

  save(todos: any){
    this.storage.set('todos', todos);
  }

  getData() {
    return this.storage.get('todos');
  }
}
