export class Subtask{
  id: number;
  todoId: number;
  name: string;
  done: boolean;

  constructor(id: number, todoId: number, name: string, done: boolean){
    this.id = id;
    this.todoId = todoId;
    this.name = name;
    this.done = done;
  }
  complete() {
    this.done = true;
  }
  uncomplete() {
    this.done = false;
  }
}
