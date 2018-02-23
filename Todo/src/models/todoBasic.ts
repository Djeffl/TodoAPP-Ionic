import { Todo } from './todo';

export class TodoBasic extends Todo {
  // Basic type
  constructor(id: string, name:string, done: boolean, createdAt: Date) {
    super(id, "Basic", name, done, createdAt);
  }
}
