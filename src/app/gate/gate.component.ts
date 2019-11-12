import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../units.service';
import { Services } from '@angular/core/src/view';
import { SourcesService } from '../sources.service';
import { Source } from '../models/source';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from './validators/customValidators';



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

  link;
  phone;


  
  constructor(private unitsService: UnitsService, private sourcesService : SourcesService) {
    
  }




  ngOnInit() {
    this.units = this.unitsService.getUnits();
    this.sourcesService.getServices()
    .subscribe((data: Array<Source>) =>  {
      this.sources = data;
    });
    this.isLead = true;


    this.form = new FormGroup({
      link : new FormControl("",),
      phone : new FormControl("",),
      
      source_id : new FormControl("", Validators.required),
      unit_id : new FormControl("", Validators.required),
      
      is_processed : new FormControl(""),
      is_add_sale : new FormControl(""),
      is_express_delivery : new FormControl(""),
      
      text : new FormControl(""),

      user_id : new FormControl(""),
    }, { validator: this.MustMatch()});
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit () {
    console.log(this.form);
  }

  MustMatch(): ValidatorFn {
    return (formControl: AbstractControl): { [key: string]: boolean } | null => {
      
      //let phone = formControl;
      let link;
      let phone;
      
      if(formControl.parent) {
        link = formControl.parent.get('link');
        phone = formControl.parent.get('phone');
      }

      if(!link || !phone) {
        console.log('null');
        return null;
      }

      
      //console.log(phone.value);

      if(link.value == "" && phone.value == "" || link.value != "" && phone.value != "") {
        return {'mustMatch': true};
      }
    
      else {
        console.log('empty');
        return null;
      }

      



      
      
    };
  }



}
