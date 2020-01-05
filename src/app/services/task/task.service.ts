import { Injectable } from '@angular/core';
import { HttpService } from '../http-service';
import { Task } from 'src/app/models/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  
  getArchiveTasks(page: number) {
    return this.http.get(environment.apiUrl + 'api/admin/tasks/archive/index'+"?page=" + page);
  }
  getTasks() {
    return this.http.get(environment.apiUrl + 'api/admin/tasks');
  }

  constructor(private http: HttpService) {
    
  }

  storeTask(task: Task) {
    return this.http.post(environment.apiUrl + 'api/admin/tasks', task );
  }
}
