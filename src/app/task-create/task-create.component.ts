import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from './../task.service';
import {Task} from '../app.task.model';
@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  Status = ['ToDo', 'InProgress', 'Completed'];

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {}

  submitTask(form: NgForm){
    // addTask function directly written in the submit form
    // when the form will be submitted it will automatically add the details
    this.taskService.addTaskService(
      form.value.task_name,
      form.value.task_description,
      form.value.assignee,
      form.value.start_date,
      form.value.due_date,
      form.value.status,

    );
  }

}
