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
      .subscribe( _task => this.task = _task )     
  }

  public goBack() {
    this.location.back()
  }

}