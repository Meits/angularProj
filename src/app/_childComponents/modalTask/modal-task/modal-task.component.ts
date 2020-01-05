import { Component, OnInit, Input } from '@angular/core';
import { MzBaseModal, MzToastService } from 'ngx-materialize';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Source } from 'src/app/models/source';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task/task.service';
import { UnitsService } from 'src/app/units.service';
import { SourcesService } from 'src/app/sources.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.sass']
})
export class ModalTaskComponent extends MzBaseModal implements OnInit {

  form : FormGroup;
  units: Array<object>;
  sources: Array<Source>;
  users: Array<User>;
  task : Task;
  
  constructor(
      private taskService : TaskService, 
      private toastService: MzToastService,
      private unitsService: UnitsService, 
      private sourcesService : SourcesService, 
      private userService : UserService,
      ) {
    super();
  }

  @Input() tasks : Array<Task>;

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  ngOnInit() {

    if(!this.task) {
      this.task = new Task();
    }

    let vv = this;
    setTimeout(function() {
      vv.units = vv.unitsService.getUnits();
      vv.getUsers();
    
      vv.sourcesService.getServices()
      .subscribe((data: Array<Source>) =>  {
        vv.sources = data;
      });
    },10);
    
    this.form = new FormGroup({

      linkPhone : new FormGroup({
        link : new FormControl(''),
        phone : new FormControl(''),
      }
      , this.MustMatch()),
      
      source_id : new FormControl('', Validators.required),
      unit_id : new FormControl('', Validators.required),
      responsible_id : new FormControl('', Validators.required),
      
      text : new FormControl(""),
      
    });

  
  }

  getUsers () {
    this.userService.getUsers()
      .subscribe((data: any) =>  {
        this.users = data.users;
      });
  }

  MustMatch(): ValidatorFn {
    return (group: FormGroup):  ValidationErrors => {

      const link = group.controls['link'];
      const phone = group.controls['phone'];

      if(!link || !phone) {
        return null;
      }


      if((!link.value && !phone.value) || (link.value  && phone.value )) {
        link.setErrors({'mustMatch': true});
        phone.setErrors({'mustMatch': true});
        return {'mustMatch': true};
      }
    
      else {
        link.setErrors(null);
        phone.setErrors(null);
        return null;
      }
      
    };
  }

  onSubmit () {

    if (this.form.invalid) {
      return;
    }

    this.task = Object.assign(this.form.value, this.form.get('linkPhone').value);
    this.storeTask();
    
    this.form.reset({ 
      text : "",
      responsible_id : "",
    });

    this.form.markAsPristine();
    this.form.markAsUntouched();

    this.modalComponent.closeModal();
    
  }
  storeTask() {
    this.taskService.storeTask(this.task).subscribe((data) => {
      this.toastService.show('Saved', 4000);
      this.tasks.push(data.task);
    });
  }


}
