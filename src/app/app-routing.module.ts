import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { TaskCreateComponent } from './task-create/task-create.component';

const routes: Routes = [
  { path:'', component: BodyComponent },
  { path:'createtask', component: TaskCreateComponent },
  { path:'edittask/:taskId', component:TaskCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
