import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLead'
})
export class NewLeadPipe implements PipeTransform {

  transform(nLeads, leadProcess : boolean, leadExpress : boolean) {
    if(nLeads && nLeads.length === 0) {
        return nLeads
    }

    let tmp = nLeads;

    if(leadProcess) {
      tmp = nLeads.filter((lead) => lead.is_processed == leadProcess);
    }

    if(leadExpress) {
      tmp = tmp.filter((lead) => lead.is_express_delivery == leadExpress);
    }

    return tmp;
  }

}
