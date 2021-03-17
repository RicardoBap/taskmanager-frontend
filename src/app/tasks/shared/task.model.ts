export class Task {
  public id: number
  public title: string
  public description: string
  public done: boolean
  public deadline: string

  constructor(id: number, title: string, description?: string, done?: boolean, deadline?: string) {
    this.id = id
    this.title = title
    this.description = description
    this.done = done
    this.deadline = deadline
  }
}

// ?(elvis) que o campo não é obrigatório
// export class Task {
//   constructor(
//     public id: number,
//     public title: string,
//     public description?: string,
//     public done?: boolean,
//     public deadline?: string) {}  
// }