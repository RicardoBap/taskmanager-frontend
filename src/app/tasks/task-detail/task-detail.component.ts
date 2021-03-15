import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import { Task } from './../shared/task.model'
import { TaskService } from './../shared/task.service';
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html'
})
export class TaskDetailComponent implements OnInit {

  public task: Task

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location) {}

  public ngOnInit() {
    this.route.params
      .switchMap( (params: Params) => this.taskService.getTask(+params['id']) )
      .subscribe({
        next: (task) => this.task = task,
        error: (error) => alert("Ocorreu um erro no servidor, tente novamente mais tarde")
      })     
  }

  public goBack() {
    this.location.back()
  }

  public updateTask() {
    if(!this.task.title) {
      alert('A tarefa deve ter um título')
    } else {
      this.taskService.updateTask(this.task)
        .subscribe(
          () => alert('Tarefa atualizada com sucesso!'),
          () => alert('Ocorreu um erro no servidor, tente novamente mais tarde')
        )
    }
  }

}