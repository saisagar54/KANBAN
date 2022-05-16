import { Injectable } from '@angular/core';
import {Task} from './app.task.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private updatedTasks = new Subject<Task[]>();
   constructor(private http:HttpClient) { }

   getTasks(){
    //return [...this.posts];
    this.http.get<{message:string, tasks:any}>('http://localhost:3000/api/tasks')
    .pipe(map((taskData)=>{
      return taskData.tasks.map((task:any) =>{
        return {
          task_name: task.task_name,
          task_description: task.task_description,
          assignee: task.assignee,
          status: task.status,
          start_date:task. start_date,
          due_date:task. due_date,
          id: task._id
        }
      })
    }))
    .subscribe((transformedData)=>{
      console.log(transformedData);
      this.tasks = transformedData;
      this.updatedTasks.next([...this.tasks]);
    })
  }

  addTaskService(
    task_name: string,
    task_description: string,
    assignee: string,
    start_date: Date ,
    due_date: Date,
    status: string

  ) {
    const task: Task = {
      id:null!,
      task_name: task_name,
      task_description: task_description,
      assignee: assignee,
      start_date: start_date,
      due_date: due_date,
      status: status,
    };
    console.log("*****************************",task);
    this.http.post<{message: string; taskId: string}>('http://localhost:3000/api/tasks',task)
    .subscribe((responseData)=>{
    const id = responseData.taskId;
    task.id = id;
    console.log("*****Server Responded", responseData);
    this.tasks.push(task);
    this.updatedTasks.next([...this.tasks]);
  });
  }

  deleteTask(taskId: string | undefined){
    this.http.delete('http://localhost:3000/api/tasks/'+taskId)
    .subscribe(()=>{
      const updatedTask = this.tasks.filter(task=> task.id !=taskId);
      this.tasks = updatedTask;
      this.updatedTasks.next([...this.tasks]);
      console.log('Deleted!');
    })
  }

  updateTask(id:string, task_name: string, task_description: string,assignee: string, status:string, start_date:Date,due_date:Date){
    const task: Task = {id: id, task_name: task_name, task_description:task_description,assignee:assignee, status: status,start_date:start_date,due_date:due_date};
    this.http.put('http://localhost:3000/api/tasks/'+id, task)
    .subscribe(response => console.log(response));
  }

  getTask(id: string | undefined){
    return this.tasks.find(task => task.id ===id);
  }


  getTaskUpdateListener() {
    return this.updatedTasks.asObservable();
  }

}
