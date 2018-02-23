export class Todo {
  id: string; //UUID
  name: string;
  //time: string; // Remove me soon please -> Needs to become displayElement
  done: boolean;
  completedAt: Date;
  createdAt: Date;
  type: string; // Options: [none, subtasks, time] Note to self: visualize with icons & fancy shizzle
  // startTime: string;
  // subTasks: Array<string>;
  // timeLeft: string;

  // Basic type
  constructor(id: string, type: string, name:string, done: boolean, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.done = done;
    this.createdAt = createdAt;
  }

  // // Time type
  // constructor(id: string, type: string, name: string, done: boolean, createdAt: Date, startTime: string) {
  //   this.id = id;
  //   this.type = type;
  //   this.name = name;
  //   this.done = done;
  //   this.createdAt = createdAt;
  //   this.startTime = startTime;
  //   this.timeLeft = startTime;
  // }
  //
  // // Assignments type
  // constructor(id: string, type: string, name: string, done: boolean){ // ,createdAt: Date, subTasks: Array<string>) {
  //   this.id = id;
  //   this.type = type;
  //   this.name = name;
  //   this.done = done;
  //   //this.createdAt = createdAt;
  //   //this.subTasks = subTasks;
  // }
}
