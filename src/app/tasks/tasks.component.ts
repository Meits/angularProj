import { Component, OnInit, ComponentRef } from '@angular/core';
import { Task } from '../models/task';
import { ModalHistoryComponent } from '../_childComponents/modalTask/modal-history/modal-history.component';
import { TaskService } from '../services/task/task.service';
import { MzModalService } from 'ngx-materialize';
import { ModalTaskComponent } from '../_childComponents/modalTask/modal-task/modal-task.component';
import { User } from '../models/user';
import { ModalTaskHistoryComponent } from '../_childComponents/modalRask/modal-task-history/modal-task-history.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  processingTasks : Array<Task>;
  nTasks : Array<Task>;
  dTasks : Array<Task>;

  allTasks : boolean = false;
  meTasks : boolean= false;

  user : User;

  public modalComponentRef: ComponentRef<ModalHistoryComponent>;

  customOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
        touchDrag: true, 
        mouseDrag: true,
        dots: true
      },
      940: {
        items: 3, 
        touchDrag: false, 
        mouseDrag: false
      }
    },
    nav: true
  }

  constructor(
    private taskService : TaskService,
    private modalService: MzModalService,
  ) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe((data) => {
      this.processingTasks = data.tasks.process;
      this.nTasks = data.tasks.new;
      this.dTasks = data.tasks.done;
    });

    this.user = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  public openSourceModal() {
    this.modalService.open(ModalTaskComponent,{tasks : this.nTasks});
  }

  public openHistory(event, task : Task, index : number, tasks : Array<Task>) {
    this.modalComponentRef = <ComponentRef<ModalTaskHistoryComponent>>this.modalService.open(ModalTaskHistoryComponent,
                  {
                    nTasks : this.nTasks, 
                    processingTasks : this.processingTasks, 
                    dTasks : this.dTasks, 
                    task : task, 
                    index,
                    tasks : tasks
                  });
  }

}
