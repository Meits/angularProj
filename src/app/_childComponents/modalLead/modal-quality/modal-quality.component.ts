import { Component, OnInit, Input } from '@angular/core';
import { MzBaseModal, MzModalService, MzToastService } from 'ngx-materialize';
import { Lead } from 'src/app/models/lead';
import { LeadService } from 'src/app/services/lead/lead.service';

@Component({
  selector: 'app-modal-quality',
  templateUrl: './modal-quality.component.html',
  styleUrls: ['./modal-quality.component.sass']
})
export class ModalQualityComponent extends MzBaseModal  implements OnInit {

  constructor(
    private leadService : LeadService,
    private modalService: MzModalService,
    private toastService: MzToastService,
    ) {
    super();
  }
  

  @Input() lead : Lead;
  @Input() dLeads : Array<Lead>;


  ngOnInit() {

  }

  addQuality()  {

    //let vv = this;

    this.leadService.addQuality(this.lead).subscribe((data) => {
      
      let vv = this;
      this.toastService.show('Saved', 4000);

      this.lead = data.lead;
      
      let indSpl = undefined;
      this.dLeads.forEach(function(item,i) {
        if(item.id == vv.lead.id) {
            indSpl = i;
        }
      });

      if(indSpl != undefined) {
          this.dLeads.splice(indSpl, 1, this.lead);
      }

      this.modalComponent.closeModal();

    });
  } 

}
