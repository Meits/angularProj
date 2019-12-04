import { Component, OnInit, Input } from '@angular/core';
import { MzBaseModal, MzToastService } from 'ngx-materialize';
import { LeadService } from 'src/app/services/lead/lead.service';
import { Lead } from 'src/app/models/lead';
import { UnitsService } from 'src/app/units.service';
import { SourcesService } from 'src/app/sources.service';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Source } from 'src/app/models/source';

@Component({
  selector: 'app-modal-lead',
  templateUrl: './modal-lead.component.html',
  styleUrls: ['./modal-lead.component.sass']
})
export class ModalLeadComponent extends MzBaseModal  implements OnInit {

  form : FormGroup;
  units: Array<object>;
  sources: Array<Source>;
  lead : Lead;
  
  constructor(
      private leadService : LeadService, 
      private toastService: MzToastService,
      private unitsService: UnitsService, 
      private sourcesService : SourcesService, 
      ) {
    super();
  }

  @Input() leads : Array<Lead>;

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  

  ngOnInit() {

    if(!this.lead) {
      this.lead = new Lead();
    }

    let vv = this;
    setTimeout(function() {
      vv.units = vv.unitsService.getUnits();
    
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
      
      is_processed : new FormControl("0"),
      is_add_sale : new FormControl("0"),
      is_express_delivery : new FormControl("0"),
      
      text : new FormControl(""),
      
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

    this.lead = Object.assign(this.form.value, this.form.get('linkPhone').value);
    this.checkLead();
    
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

    this.modalComponent.closeModal();
    
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
      this.leads.push(data.lead);
    });

  }

  updateLead() {
    this.leadService.udateLead(this.lead).subscribe((data) => {
      this.toastService.show('Updated', 4000);
    });
  }

}
