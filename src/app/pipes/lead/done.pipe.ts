import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'done'
})
export class DonePipe implements PipeTransform {

  //dleadQuality:dleadQualityFalse
  transform(doneLeads, dleadQuality : boolean , dleadQualityFalse : boolean) {
    if(doneLeads && doneLeads.length === 0) {
        return doneLeads
    }

    let tmp = doneLeads;

    if(dleadQuality) {
      tmp = doneLeads.filter((lead) => lead.isQualityLead == dleadQuality);
    }

    if(dleadQualityFalse) {
      tmp = tmp.filter((lead) => lead.isQualityLead != dleadQualityFalse);
    }

    if(tmp) {
      tmp =  tmp.sort(function (first, second) {
        let a = first.created_at;
        let b = second.created_at;
  
        if (a < b) {
            return 1;
        }
        if (a > b) {
            return -1;
        }
        return 0;
      });
    }
    

    return tmp;
  }

}
