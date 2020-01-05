import { Task } from './task';
import { TaskComment } from './taskComment';


export class TaskHistory {
    task : Task;
    history : Array<TaskComment>;
}