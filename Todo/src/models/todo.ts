export class Todo {
  id: string; //UUID
  name: string;
  displayElement: string;
  done: boolean;
  completedAt: Date;
  createdAt: Date;
  type: string; // Options: [none, subtasks, time] Note to self: visualize with icons & fancy shizzle
  startTime: string;
  subTasks: Array<{name:string, done: boolean}>;
  timeLeft: string;

  constructor(id: string, type: string, name:string, done: boolean, createdAt: Date, typeParameter?: any) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.done = done;
    this.createdAt = createdAt;
    if(type == "Basic") {
      this.displayElement = "-";
    }
    else if(type == "Time") {
      this.startTime = typeParameter;
      this.timeLeft = typeParameter;
      this.displayElement = typeParameter;
    }
    else if (type == "Assignments") {
      this.subTasks = typeParameter;
      this.displayElement = typeParameter.length;
    }
  }
}
