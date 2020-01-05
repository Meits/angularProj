import { Component, OnInit, ComponentRef } from '@angular/core';
import { LeadService } from '../services/lead/lead.service';
import { Lead } from '../models/lead';
import { ModalHistoryComponent } from '../_childComponents/modalLead/modal-history/modal-history.component';
import { MzModalService } from 'ngx-materialize';
import { ModalArchiveLeadHistoryComponent } from './modal-archive-lead-history/modal-archive-lead-history.component';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.sass']
})
export class ArchivesComponent implements OnInit {

  page : number;
  leads : Array<Lead>;

  dleadQuality : boolean= false;
  dleadQualityFalse : boolean= false;

  public modalComponentRef: ComponentRef<ModalArchiveLeadHistoryComponent>;

  constructor(private leadService : LeadService, private modalService: MzModalService,) {
    this.page = 1;
    this.leads  = [];
  }



  ngOnInit() {
    this.getLeads();
  }

  public getLeads() {
    this.leadService.getArchiveLeads(this.page).subscribe((data) => {
      let leadT : Array<Lead> = this.leads;
      
      data.leads.forEach(function(item) {
          leadT.push(item)
      });
    });
  }

  public loadLead() {
    ++this.page;
    this.getLeads();
  }

  public openHistory(event, lead : Lead, index : number, leads : Array<Lead>) {
    this.modalComponentRef = <ComponentRef<ModalArchiveLeadHistoryComponent>>this.modalService.open(ModalArchiveLeadHistoryComponent,
                  {
                    nLeads : [], 
                    processingLeads : [], 
                    dLeads : [], 
                    lead : lead, index,
                    leads : []
                  });
  }

}
