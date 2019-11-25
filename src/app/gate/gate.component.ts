import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../units.service';
import { Services } from '@angular/core/src/view';
import { SourcesService } from '../sources.service';
import { Source } from '../models/source';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CustomValidators } from './validators/customValidators';
import { LeadService } from '../services/lead/lead.service';
import { Lead } from '../models/lead';
import { MzToastService } from 'ngx-materialize';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task/task.service';
import { Task } from '../models/task';



@Component({
  selector: 'app-gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.sass'],
  
})
export class GateComponent implements OnInit {

  

  form : FormGroup;
  units: Array<object>;
  sources: Array<Source>;
  users : Array<User>;

  isLead : boolean;
  addSaleCount : number = 0;

  lead : Lead;
  task : Task;



  
  constructor(  
        private unitsService: UnitsService, 
        private sourcesService : SourcesService, 
        private leadService : LeadService, 
        private toastService : MzToastService,
        private userService : UserService,
        private taskService : TaskService
  ) {
    this.lead = new Lead();
    this.task = new Task();
  }




  ngOnInit() {
    this.units = this.unitsService.getUnits();
    this.getAddSaleCount();
    this.sourcesService.getServices()
    .subscribe((data: Array<Source>) =>  {
      this.sources = data;
    });
    this.isLead = true;

    this.getUsers();


    this.form = new FormGroup({

      linkPhone : new FormGroup({
        link : new FormControl("",),
        phone : new FormControl("",),
      }
      , this.MustMatch()),
      
      source_id : new FormControl("", Validators.required),
      unit_id : new FormControl("", Validators.required),
      
      is_processed : new FormControl("0"),
      is_add_sale : new FormControl("0"),
      is_express_delivery : new FormControl("0"),
      
      text : new FormControl(""),
      responsible_id : new FormControl(""),
      is_lead : new FormControl(true),
    
      
    });

    this.onChangesIsLead();
  }

  onChangesIsLead(): void {
    this.form.get('is_lead').valueChanges.subscribe(val => {
      this.isLead = val;
      this.form.controls['responsible_id'].setValidators(null);
      if(!val) {
        this.form.controls['responsible_id'].setValidators([Validators.required])
      }

      this.form.controls['responsible_id'].updateValueAndValidity();
      
    });
  }


  getAddSaleCount()  {
    this.leadService.addSaleCount().subscribe((data) => {
      this.addSaleCount = data.data.number;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit () {

    if (this.form.invalid) {
      return;
    }


    if(this.isLead) {
      this.lead = Object.assign(this.form.value, this.form.get('linkPhone').value);
      this.checkLead();
    }
    else {
      this.task = Object.assign(this.form.value, this.form.get('linkPhone').value);
      this.storeTask();
    }
    
    this.form.reset({ 
      is_processed :"0",
      is_add_sale : "0",
      is_express_delivery : "0",
      
      text : "",
      responsible_id : "",
      is_lead : true,
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    
  }
  storeTask() {
    this.taskService.storeTask(this.task).subscribe((data) => {
      this.toastService.show('Saved', 4000);
    });
  }

  getUsers () {
    this.userService.getUsers()
      .subscribe((data: any) =>  {
        this.users = data.users;
        console.log(this.users);
      });
  }

  checkLead () {
    this.leadService.checkLead(this.lead).subscribe((data) => {
      if(data.exist) {
          this.lead.id = data.lead.id;
          this.updateLead();
      }
      else {
        this.storeLead();
      }
    });
  }

  storeLead () {
    this.leadService.storeLead(this.lead).subscribe((data) => {
      this.toastService.show('Saved', 4000);
    });
  }

  updateLead() {
    this.leadService.udateLead(this.lead).subscribe((data) => {
      this.toastService.show('Updated', 4000);
      //this.addSaleCount++;
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



}
