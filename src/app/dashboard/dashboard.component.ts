import { Component, OnInit } from '@angular/core';
import { LeadService } from '../services/lead/lead.service';
import { Lead } from '../models/lead';
import { ModalSourcesComponent } from '../modal-sources/modal-sources.component';
import { MzModalService, MzToastService } from 'ngx-materialize';
import { ModalLeadComponent } from '../_childComponents/modalLead/modal-lead/modal-lead.component';
import { ModalHistoryComponent } from '../_childComponents/modalLead/modal-history/modal-history.component';
//import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  processingLeads : Array<Lead>;
  nLeads : Array<Lead>;
  dLeads : Array<Lead>;

  leadExpress : boolean = false;
  leadProcess : boolean= false;


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
    private leadService : LeadService,
    private modalService: MzModalService,
    ) { 

    }

  ngOnInit() {
    this.leadService.getLeads().subscribe((data) => {
      this.processingLeads = data.leads.process;
      this.nLeads = data.leads.new;
      this.dLeads = data.leads.done;
    });
  }

  public openSourceModal() {
    this.modalService.open(ModalLeadComponent,{leads : this.nLeads});
  }

  //$event, lead.id, i, nLeads
  public openHistory(event, lead : Lead, index : number, leads : Array<Lead>) {
    this.modalService.open(ModalHistoryComponent,{leads : leads, lead : lead, index});
  }

}
