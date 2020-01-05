import { Component, OnInit, Input } from '@angular/core';
import { MzBaseModal, MzToastService } from 'ngx-materialize';
import { FormGroup, FormControl } from '@angular/forms';
import { Source } from 'src/app/models/source';
import { User } from 'src/app/models/user';
import { Status } from 'src/app/models/status';
import { TaskComment } from 'src/app/models/taskComment';
import { TaskService } from 'src/app/services/task/task.service';
import { UnitsService } from 'src/app/units.service';
import { SourcesService } from 'src/app/sources.service';
import { UserService } from 'src/app/services/user.service';
import { StatusService } from 'src/app/services/status/status.service';
import { TaskCommentService } from 'src/app/services/task/task-comment.service';
import { Task } from 'src/app/models/task';
import { TaskHistory } from 'src/app/models/taskHistory';

@Component({
  selector: 'app-modal-task-history',
  templateUrl: './modal-task-history.component.html',
  styleUrls: ['./modal-task-history.component.sass']
})
export class ModalTaskHistoryComponent extends MzBaseModal  implements OnInit  {

  form : FormGroup;
  units: Array<object>;
  sources: Array<Source>;
  taskComments: Array<TaskComment>;
  taskComment: TaskComment;
  users : Array<User>;
  statuses : Array<Status>;
  
  
  constructor(
    private taskService : TaskService, 
    private toastService: MzToastService,
    private unitsService: UnitsService, 
    private sourcesService : SourcesService, 
    private taskCommentService : TaskCommentService,
    private userService : UserService,
    private statusService : StatusService
  ) {
      super();
      
      this.taskComments = [];
      this.taskComment = new TaskComment();

  }


  @Input() nTasks : Array<Task>;
  @Input() processingTasks : Array<Task>;
  @Input() dTasks : Array<Task>;
  @Input() tasks : Array<Task>;
  @Input() task : Task;
  @Input() index : number;

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  ngOnInit() {
    if(!this.task) {
      this.task = new Task();
    }

    let vv = this;
    setTimeout(function() {

      vv.getUsers();
      vv.getStatuses();
      vv.units = vv.unitsService.getUnits();
      
      vv.sourcesService.getServices()
      .subscribe((data: Array<Source>) =>  {
        vv.sources = data;
      });

      if(vv.task.id) {
        vv.taskCommentService.getComments(vv.task.id).subscribe((data: TaskHistory) =>  {
          vv.taskComments = data.history;
        });
      }
      
    },10);

    this.form = new FormGroup({

      text : new FormControl(""),
      status_id : new FormControl(this.task.status_id),
      responsible_id : new FormControl(this.task.responsible_id),
      
    });
    
  }

  getStatuses() {
    this.statusService.getStatuses()
      .subscribe((data: any) =>  {
        this.statuses = data.statuses;
      });
  }

  getUsers () {
    this.userService.getUsers()
      .subscribe((data: any) =>  {
        this.users = data.users;
      });
  }

  onSubmit () {

    if (this.form.invalid) {
      return;
    }

    this.taskComment = Object.assign(this.form.value);
    this.taskComment.task_id = this.task.id;

    this.storeTaskComment();

    this.modalComponent.closeModal();
    
  }

  storeTaskComment() {

    this.taskCommentService.storeTaskComment(this.taskComment).subscribe((data) => {
      this.toastService.show('Saved', 4000);
    
      this.tasks.splice(this.index, 1); /*вырезаем лид*/
      
      this.task = data.task;
      if(this.task.status_id == 1) {
        this.nTasks.push(this.task);
      }
      if(this.task.status_id == 2) {
        this.processingTasks.push(this.task);
      }
      if(this.task.status_id == 3) {
        this.dTasks.push(this.task);
      }

    });

  
  }

  

}
