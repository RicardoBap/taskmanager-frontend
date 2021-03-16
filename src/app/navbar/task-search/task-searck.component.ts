import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Task } from './../../tasks/shared/task.model';
import { TaskService } from './../../tasks/shared/task.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject"
import 'rxjs/add/operator/switchMap'
// import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/Observable/of'

 
@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html'
})
export class TaskSearchComponent implements OnInit {

  public searchTerms: Subject<any> = new Subject()
  public tasks: Task[] = []

  public constructor(
    private taskService: TaskService,
    private route: Router) {}

  public ngOnInit() {
    this.searchTerms
    .debounceTime(500)
    .distinctUntilChanged()
    // .do(term => console.log(term))
    .switchMap(
      term => term ? this.taskService.searchByTitle(term) : Observable.of<Task[]>([])
    ).subscribe(tasks => this.tasks = tasks)
  }

  public search(term: string) {
    this.searchTerms.next(term)
  }

  public goToTask(task: Task) {
    this.tasks = []
    this.route.navigate(['/tasks', task.id])
  }

}