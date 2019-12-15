import { Component, OnInit, ChangeDetectionStrategy, ComponentRef } from '@angular/core';
import { LeadService } from '../services/lead/lead.service';
import { Lead } from '../models/lead';
import { ModalSourcesComponent } from '../modal-sources/modal-sources.component';
import { MzModalService, MzToastService, MzBaseModal } from 'ngx-materialize';
import { ModalLeadComponent } from '../_childComponents/modalLead/modal-lead/modal-lead.component';
import { ModalHistoryComponent } from '../_childComponents/modalLead/modal-history/modal-history.component';
import { ModalQualityComponent } from '../_childComponents/modalLead/modal-quality/modal-quality.component';
//import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  processingLeads : Array<Lead>;
  nLeads : Array<Lead>;
  dLeads : Array<Lead>;

  leadExpress : boolean = false;
  leadProcess : boolean= false;

  dleadQuality : boolean= false;
  dleadQualityFalse : boolean= false;
  processingLeadProcess : boolean= false;

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

  dateHelper(datepart : string, fromdate : any, todate : any) : any {
    datepart = datepart.toLowerCase();
    var diff = todate - fromdate;

    var divideBy =
        {
            w: 604800000,
            d: 86400000,
            h: 3600000,
            n: 60000,
            s: 1000
        };

    return Math.floor(diff / divideBy[datepart]);
  }

  datecheck(created_at, numb, type) :boolean {
    if(type == 'less') {
      return this.dateHelper('h', new Date(created_at*1000),new Date()) < numb;
    }
    if(type == 'more') {
      return this.dateHelper('h', new Date(created_at*1000),new Date()) > numb;
    }

  }


  timeStr(date) : string {
    let resultDate = this.dateHelper('h', new Date(date * 1000), new Date());
    let strResult = "";
    console.log(resultDate);
    if (resultDate < 24) {
        strResult = "до 24 часов";
    }
    else if (resultDate > 24 && resultDate < 48) {
        strResult = " 24-48 часа";
    }
    else if (resultDate > 48 && resultDate < 72) {
        strResult = "48-72 часа";
    }
    else {
        strResult = "72 часа и более";
    }
    return strResult
  }
 

  //$event, lead.id, i, nLeads
  public openHistory(event, lead : Lead, index : number, leads : Array<Lead>) {
    this.modalComponentRef = <ComponentRef<ModalHistoryComponent>>this.modalService.open(ModalHistoryComponent,
                  {
                    nLeads : this.nLeads, 
                    processingLeads : this.processingLeads, 
                    dLeads : this.dLeads, 
                    lead : lead, index,
                    leads : leads
                  });

    this.modalComponentRef.instance.onQuality.subscribe((lead : Lead) => {
      this.modalService.open(ModalQualityComponent, {lead : lead, dLeads : this.dLeads}); // here you will get the value
    });

    //this.nLeads.splice(this.index, 1, this.lead); /*вырезаем лид*/
  }

}
