import { Injectable } from '@angular/core';
import {Task} from './app.task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private updatedTasks = new Subject<Task[]>();

  constructor() { }

  addTaskService(
    task_name: string,
    task_description: string,
    assignee: string,
    start_date: Date ,
    due_date: Date,
    //status: string

  ) {
    const task: Task = {
      task_name: task_name,
      task_description: task_description,
      assignee: assignee,
      start_date: start_date,
      due_date: due_date,
      //status: status
    };
    this.tasks.push(task);
    console.log('Added', task);
    this.updatedTasks.next([...this.tasks]);
  }

  getTasks() {
    return [...this.tasks];
  }

  getTaskUpdateListener() {
    return this.updatedTasks.asObservable();
  }

}
