import { Component, OnInit } from "@angular/core";

import { Task } from './../tasks/shared/task.model';
import { TaskService } from './../tasks/shared/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public tasks: Task[]

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getImportant()
      .subscribe({
        next: (tasks) => { this.tasks = tasks },
        error: (error) => alert("Ocorreu um erro no servidor, tente novamente mais tarde")
      })
  }

}