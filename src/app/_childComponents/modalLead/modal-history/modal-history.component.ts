import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MzBaseModal, MzToastService } from 'ngx-materialize';
import { LeadService } from 'src/app/services/lead/lead.service';
import { Lead } from 'src/app/models/lead';
import { UnitsService } from 'src/app/units.service';
import { SourcesService } from 'src/app/sources.service';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Source } from 'src/app/models/source';
import { LeadComment } from 'src/app/models/leadComment';
import { LeadCommentService } from 'src/app/services/lead/lead-comment.service';
import { LeadHistory } from 'src/app/models/leadHistory';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Status } from 'src/app/models/status';
import { StatusService } from 'src/app/services/status/status.service';

@Component({
  selector: 'app-modal-history',
  templateUrl: './modal-history.component.html',
  styleUrls: ['./modal-history.component.sass'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalHistoryComponent extends MzBaseModal  implements OnInit {

  form : FormGroup;
  units: Array<object>;
  sources: Array<Source>;
  leadComments: Array<LeadComment>;
  leadComment: LeadComment;
  users : Array<User>;
  statuses : Array<Status>;
  
  constructor(
      private leadService : LeadService, 
      private toastService: MzToastService,
      private unitsService: UnitsService, 
      private sourcesService : SourcesService, 
      private leadCommentService : LeadCommentService,
      private userService : UserService,
      private statusService : StatusService
      ) {
    super();

    this.leadComments = [];
    this.leadComment = new LeadComment();
  }

  @Input() nLeads : Array<Lead>;
  @Input() processingLeads : Array<Lead>;
  @Input() dLeads : Array<Lead>;
  @Input() leads : Array<Lead>;
  @Input() lead : Lead;
  @Input() index : number;

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  

  ngOnInit() {


    if(!this.lead) {
      this.lead = new Lead();
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

      if(vv.lead.id) {
        vv.leadCommentService.getComments(vv.lead.id).subscribe((data: LeadHistory) =>  {
          vv.leadComments = data.history;
        });
      }
      
    },10);


    this.form = new FormGroup({

      text : new FormControl(""),
      status_id : new FormControl(this.lead.status_id),
      user_id : new FormControl(this.lead.user_id),
      
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

    this.leadComment = Object.assign(this.form.value);
    this.leadComment.lead_id = this.lead.id;

    this.storeLeadComment();

    this.modalComponent.closeModal();
    
  }
  storeLeadComment() {

    this.leadCommentService.storeLeadComment(this.leadComment).subscribe((data) => {
      this.toastService.show('Saved', 4000);

      //console.log(this.leads)
    
      this.leads.splice(this.index, 1); /*вырезаем лид*/
      
      this.lead = data.lead;
      if(this.lead.status_id == 1) {
        this.nLeads.push(this.lead);
      }
      if(this.lead.status_id == 2) {
        this.processingLeads.push(this.lead);
      }
      if(this.lead.status_id == 3) {
        this.dLeads.push(this.lead);
      }

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
      this.nLeads.push(data.lead);
    });

  }

  updateLead() {
    this.leadService.udateLead(this.lead).subscribe((data) => {
      this.toastService.show('Updated', 4000);
    });
  }

}
