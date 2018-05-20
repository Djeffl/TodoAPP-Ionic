export class Subtask{
  id: number;
  todoId: number;
  name: string;
  done: string;

  constructor(id: number, todoId: number, name: string, done: string){
    this.id = id;
    this.todoId = todoId;
    this.name = name;
    this.done = done;
  }
}
