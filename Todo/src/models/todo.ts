export class Todo {
  id: string; //UUID
  name: string;
  time: string;
  done: boolean;
  completedAt: Date;
  createdAt: Date;
  details: any;

  constructor(id: string, name:string, time: string, done: boolean, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.time = time;
    this.done = done;
    this.createdAt = createdAt;
  }
}
