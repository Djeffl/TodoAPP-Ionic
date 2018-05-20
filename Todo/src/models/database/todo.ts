export class Todo {
  id: number;
  type: string;
  name: string;
  done: string;
  createdAt: string;
  completedAt: string;
  typeParameter: string;


  constructor(id: number, type: string, name:string, done: string, createdAt: string, completedAt: string, typeParameter: string) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.done = done;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
    this.typeParameter = typeParameter;
  }
}
