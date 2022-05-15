import { Component, OnInit } from '@angular/core';
import {Task} from '../app.task.model';
import { TaskService } from 'src/app/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  Tasks: Task[] = [];
  private tasksSub: Subscription | undefined;

  panelOpenState = false;
  constructor(public taskService: TaskService) { }


  ngOnInit(): void {
    this.Tasks = this.taskService.getTasks();
    console.log(this.Tasks);
    this.tasksSub = this.taskService
      .getTaskUpdateListener()
      .subscribe((Tasks: Task[]) => {
        this.Tasks = Tasks;
      });
  }
  ngOnDestroy(): void {
    this.tasksSub?.unsubscribe();
  }

}
