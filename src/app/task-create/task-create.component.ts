import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from './../task.service';
import {Task} from '../app.task.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  Status = ['ToDo', 'InProgress', 'Completed'];

  private mode = 'create';
  private taskId!: string;
  task!: Task;

  constructor(public taskService: TaskService, public route: ActivatedRoute) { }



  submitTask(form: NgForm){
    if(this.mode ==="create"){
    this.taskService.addTaskService(
      form.value.task_name,
      form.value.task_description,
      form.value.assignee,
      form.value.start_date,
      form.value.due_date,
      form.value.status,
     );}
     else {
      this.taskService.updateTask(
        this.taskId,
        form.value.task_name,
        form.value.task_description,
        form.value.assignee,
        form.value.start_date,
        form.value.due_date,
        form.value.status);
      }
        form.resetForm();

  }
  ngOnInit(): void {
  this.route.paramMap.subscribe((paramMap: ParamMap)=>{
    console.log("parammap is", paramMap);
    if(paramMap.has('taskId')){
      this.mode = 'edit';
      this.taskId = paramMap.get('taskId')!;
      console.log("Task ID", this.taskId);
      this.task = this.taskService.getTask(this.taskId)!;
    //Post | undefined = Post | undefined
    // number = string
      console.log("Got the Task", this.task);
    }
    else {
      this.mode ='create';
      this.taskId = null!;
      console.log("not in edit");
    }
  })
}
}
