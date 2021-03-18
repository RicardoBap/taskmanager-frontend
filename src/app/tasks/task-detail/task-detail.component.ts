import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
        title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255) ]],
        deadline: [null, Validators.required],
        done: [null, Validators.required],
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
    this.task.title = this.reactiveTaskForm.get('title').value
    this.task.deadline = this.reactiveTaskForm.get('deadline').value
    this.task.done = this.reactiveTaskForm.get('done').value
    this.task.description = this.reactiveTaskForm.get('description').value

    this.taskService.update(this.task)
    .subscribe(
      () => alert('Tarefa atualizada com sucesso!'),
      () => alert('Ocorreu um erro no servidor, tente novamente mais tarde')
    )
  }

  // public showFieldError(field): boolean {
  //   return field.invalid && ( field.touched || field.dirty )
  // }

}