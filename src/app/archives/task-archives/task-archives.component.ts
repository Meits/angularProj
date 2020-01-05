import { Component, OnInit, ComponentRef } from '@angular/core';
import { Task } from 'src/app/models/task';
import { ModalTaskHistoryComponent } from 'src/app/_childComponents/modalRask/modal-task-history/modal-task-history.component';
import { TaskService } from 'src/app/services/task/task.service';
import { MzModalService } from 'ngx-materialize';
import { ModalArchiveTaskHistoryComponent } from '../modal-archive-task-history/modal-archive-task-history.component';

@Component({
  selector: 'app-task-archives',
  templateUrl: './task-archives.component.html',
  styleUrls: ['./task-archives.component.sass']
})
export class TaskArchivesComponent implements OnInit {

  page : number;
  tasks : Array<Task>;

  public modalComponentRef: ComponentRef<ModalArchiveTaskHistoryComponent>;

  constructor(private taskService : TaskService, private modalService: MzModalService,) {
    this.page = 1;
    this.tasks  = [];
  }



  ngOnInit() {
    this.getTasks();
  }
  getTasks() {
    this.taskService.getArchiveTasks(this.page).subscribe((data) => {
      let taskT : Array<Task> = this.tasks;
      
      data.tasks.forEach(function(item) {
          taskT.push(item)
      });
    });
  }

  public loadTask() {
    ++this.page;
    this.getTasks();
  }

  public openHistory(event, task : Task, index : number, tasks : Array<Task>) {
    this.modalComponentRef = <ComponentRef<ModalArchiveTaskHistoryComponent>>this.modalService.open(ModalArchiveTaskHistoryComponent,
                  {
                    nTasks : [], 
                    processingTasks : [], 
                    dTasks : [], 
                    task : task, 
                    index,
                    tasks : []
                  });
  }

}
