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



@Component({
  selector: 'app-gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.sass'],
  
})
export class GateComponent implements OnInit {

  

  form : FormGroup;
  units: Array<object>;
  sources: Array<Source>;

  isLead : boolean;

  lead : Lead;



  
  constructor(private unitsService: UnitsService, private sourcesService : SourcesService, private leadService : LeadService, private toastService : MzToastService) {
    this.lead = new Lead();
  }




  ngOnInit() {
    this.units = this.unitsService.getUnits();
    this.sourcesService.getServices()
    .subscribe((data: Array<Source>) =>  {
      this.sources = data;
    });
    this.isLead = true;


    this.form = new FormGroup({

      linkPhone : new FormGroup({
        link : new FormControl("",),
        phone : new FormControl("",),
      }
      , this.MustMatch()),
      
      source_id : new FormControl("", Validators.required),
      unit_id : new FormControl("", Validators.required),
      
      is_processed : new FormControl(""),
      is_add_sale : new FormControl(""),
      is_express_delivery : new FormControl(""),
      
      text : new FormControl(""),
      user_id : new FormControl(""),
      
      
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit () {
    

    if (this.form.invalid) {
      return;
    }

    this.leadService.storeLead(this.form.value).subscribe((Lead) => {
      this.toastService.show('Saved', 4000);
      //this.clearSource();
    });



  }

  MustMatch(): ValidatorFn {
    return (group: FormGroup):  ValidationErrors => {

      const link = group.controls['link'];
      const phone = group.controls['phone'];

      if(!link || !phone) {
        return null;
      }

      if(link.value == "" && phone.value == "" || (link.value != "" && phone.value != "")) {
        link.setErrors({'mustMatch': true});
        phone.setErrors({'mustMatch': true});
        //return {'mustMatch': true};
      }
    
      else {
        link.setErrors(null);
        phone.setErrors(null);
        return null;
      }
      
    };
  }



}
