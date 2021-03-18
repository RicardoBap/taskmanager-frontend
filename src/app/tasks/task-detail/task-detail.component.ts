import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from "@angular/common";

import { Task } from './../shared/task.model'
import { TaskService } from './../shared/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styles: [`.form-control-feedback { margin-right: 25px}`]
})
export class TaskDetailComponent implements OnInit, AfterViewInit {

  public reactiveTaskForm: FormGroup
  public task: Task
  public taskDoneOptions: Array<any> 

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
    ) {
      this.taskDoneOptions = [
        { value: false, text: "Pendente" },
        { value: true, text: "Feita" }
      ]

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

    this.reactiveTaskForm.patchValue(task)
  }

  public ngAfterViewInit() {
    $("#deadline").datetimepicker({
      'sideBySide': true,
      'locale': 'pt-BR'
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

  // Forms errors methods
  public fieldClassForErrorOrSuccess(fieldName: string) {
    return {
      "has-error": this.showFieldError(fieldName),
      "has-success": this.getField(fieldName).valid
    }
  }

  public iconClassForErrorOrSuccess(fieldName: string) {
    return {
      "glyphicon-remove": this.showFieldError(fieldName),
      "glyphicon-ok": this.getField(fieldName).valid
    }
  }

  public showFieldError(fieldName: string): boolean {
    let field = this.getField(fieldName)
    return field.invalid && ( field.touched || field.dirty )
  }

  public getField(fieldName: string) {
    return this.reactiveTaskForm.get(fieldName)
  }

}