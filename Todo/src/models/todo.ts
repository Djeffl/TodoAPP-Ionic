export class Todo {
  id: string; //UUID
  name: string;
  //time: string; // Remove me soon please -> Needs to become displayElement
  done: boolean;
  completedAt: Date;
  createdAt: Date;
  type: string; // Options: [none, subtasks, time] Note to self: visualize with icons & fancy shizzle
  startTime: string;
  subTasks: Array<string>;
  timeLeft: string;

  constructor(id: string, type: string, name:string, done: boolean, createdAt: Date, typeParameter: any) {
    this.id = id;
    this.name = name;
    this.done = done;
    this.createdAt = createdAt;
    if(type == "Time") {
      this.startTime = typeParameter;
      this.timeLeft = typeParameter;
    }
    else if (type == "Assignments") {
      this.subTasks = typeParameter;
    }
  }
}
