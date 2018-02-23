import { Todo } from './todo';

export class TodoAssignments extends Todo {
  subTasks: Array<string>;

  // Assignments type
  constructor(id: string, name: string, done: boolean, createdAt: Date, subTasks: Array<string>) {
    super(id, "Assignments", name, done, createdAt);
    this.subTasks = subTasks;
  }
}
