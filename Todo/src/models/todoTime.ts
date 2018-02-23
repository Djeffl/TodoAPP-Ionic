import { Todo } from './todo';

export class TodoTime extends Todo {
  startTime: string;
  timeLeft: string;

  // Time type
  constructor(id: string, name: string, done: boolean, createdAt: Date, startTime: string) {
    super(id, "Time", name, done, createdAt);
    this.timeLeft = timeLeft;
    this.startTime = startTime;
  }
}
