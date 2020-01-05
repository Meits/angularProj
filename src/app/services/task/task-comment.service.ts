import { Injectable } from '@angular/core';
import { HttpService } from '../http-service';
import { environment } from 'src/environments/environment';
import { TaskComment } from 'src/app/models/taskComment';

@Injectable({
  providedIn: 'root'
})
export class TaskCommentService {
  

  constructor(private http: HttpService) { }

  getComments(id : number) {
    return this.http.get(environment.apiUrl + 'api/admin/tasks/' + id);
  }

  storeTaskComment(task: TaskComment) {
    return this.http.post(environment.apiUrl + 'api/admin/tasks_comments', task );
  }
}
