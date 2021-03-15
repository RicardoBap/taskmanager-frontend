import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http'

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map"
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"

import { Task } from './task.model';

@Injectable()

export class TaskService {

  public tasksUrl: string = 'api/tasks'

  public constructor(private http: Http) {}

  public getTasks(): Observable<Task[]> {
    return this.http.get(this.tasksUrl)
      .catch(this.handleErrors)
      .map((response: Response) => response.json().data as Task[]) 
  }

  public getImportantTasks(): Observable<Array<Task>> {
    return this.getTasks()
      .catch(this.handleErrors)
      .map((tasks) => tasks.slice(0, 4))
  }

  public getTask(id: number): Observable<Task> {
    let url = `${this.tasksUrl}/${id}`

    return this.http.get(url)
      .catch(this.handleErrors)
      .map((response: Response) => {
        return response.json().data as Task
      })
  }

  private handleErrors(error: Response) {
    console.log("SALVANDO O ERRO NO ARQUIVO DE LOG - DETALHES DO ERRP => ", error)
    return Observable.throw(error)
  }

}