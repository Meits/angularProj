import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myTasks'
})
export class MyTasksPipe implements PipeTransform {

  transform(tasks, meTasks : boolean, allTasks : boolean, userId : number) {
  
    if(!tasks || (tasks && tasks.length === 0)) {
      return tasks
    }

    if(allTasks) {
      return tasks;
    }

    if(!meTasks) {
      return tasks.filter(function (task) {
          if (task.responsible_id == userId) {
              return task;
          }
      });
    }
    else {
        return tasks.filter(function (task) {
            if (task.user_id == userId) {
                return task;
            }
        });
    }

  }

}
