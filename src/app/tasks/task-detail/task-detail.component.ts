import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";

import { Task } from './../shared/task.model'
import { TaskService } from './../shared/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html'
})
export class TaskDetailComponent implements OnInit, AfterViewInit {

  public reactiveTaskForm: FormGroup
  public task: Task
  public taskDoneOptions: Array<any> = [
    { value: false, text: "Pendente" },
    { value: true, text: "Feita" }
  ]

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder) {
      this.reactiveTaskForm = this.formBuilder.group({
        title: [null],
        deadline: [null],
        done: [null],
        description: [null]
      })
    }

  public ngOnInit() {
    this.task = new Task(null, null)

    this.route.params
      .switchMap( (params: Params) => this.taskService.getById(+params['id']) )
      .subscribe({
        next: (task) => this.setTask(task),
        error: (error) => alert("Ocorreu um erro no servidor, tente novamente mais tarde")
      })     
  }

  public setTask(task: Task): void {
    this.task = task

    //seValue
    // let formModel = {
    //   title: task.title || null,
    //   deadline: task.deadline || null,
    //   done: task.done || null,
    //   description: task.description || null
    // }
    // this.reactiveTaskForm.setValue(formModel)

    // patchValue
    // let formModel = {
    //   title: task.title || null,
    //   deadline: task.deadline || null,
    //   done: task.done || null,
    //   description: task.description || null
    // }
    // this.reactiveTaskForm.patchValue(formModel)

    this.reactiveTaskForm.patchValue(task)

  }

  public ngAfterViewInit() {
    $("#deadline").datetimepicker({
      'sideBySide': true,
      'locale': 'pt-BR'
    // }).on('dp.change', () => this.reactiveTaskForm.get('deadline').setValue( $("#deadline").val()) )
    }).on('dp.change', () => this.reactiveTaskForm.patchValue( { deadline: $("#deadline").val() } )) 
  } 

  public goBack() {
    this.location.back()
  }

  public updateTask() {
    this.taskService.update(this.task)
    .subscribe(
      () => alert('Tarefa atualizada com sucesso!'),
      () => alert('Ocorreu um erro no servidor, tente novamente mais tarde')
    )
  }

}