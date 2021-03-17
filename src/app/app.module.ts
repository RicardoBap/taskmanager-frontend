import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Ordem alfabética
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskService } from './tasks/shared/task.service';
import { TaskSearchComponent } from './navbar/task-search/task-searck.component';

// Módulos
import { AppRoutingModule } from './app-routing.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTaskDataService } from './in-memory-task-data.service';

// rxjs operators -> utilizados no subscribe para obter retorno do Observable
import "rxjs/add/operator/catch"
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/do'
import "rxjs/add/operator/map"
import 'rxjs/add/operator/switchMap'

// rxjs extensions -> metodos adicionais para atribuir nas classes utilizadas
import "rxjs/add/observable/throw"
import 'rxjs/add/Observable/of'

//  jquery plugins
import * as $ from 'jquery'
import * as datetimepicker from 'eonasdan-bootstrap-datetimepicker'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TasksComponent,
    TaskDetailComponent,
    DashboardComponent,
    TaskSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryTaskDataService)
  ],
  providers: [ TaskService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
