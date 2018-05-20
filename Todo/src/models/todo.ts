import { Subtask } from './subtask';


export class Todo {
  id: number;
  name: string;
  displayElement: string;
  done: boolean;
  completedAt?: Date;
  createdAt: Date;
  type: string; // Options: [none, subtasks, time] Note to self: visualize with icons & fancy shizzle
  startTime: string;
  subtasks?: Array<Subtask>;
  timeLeft: string;

  constructor(id: number, type: string, name:string, done: boolean, createdAt: Date, completedAt? : Date, typeParameter?: any) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.done = done;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
    if(type == "Basic") {
      this.displayElement = "-";
    }
    else if(type == "Time") {
      this.startTime = typeParameter;
      this.timeLeft = typeParameter;
      this.displayElement = typeParameter;
    }
    else if (type == "Assignments") {
      this.subtasks = typeParameter;
      this.displayElement = typeParameter == null ? 0: typeParameter.length;
    }
  }
}
