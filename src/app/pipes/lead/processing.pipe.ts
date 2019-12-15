import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'processing'
})
export class ProcessingPipe implements PipeTransform {

  transform(processingLeads, processingLeadProcess : boolean) {
    if(processingLeads && processingLeads.length === 0) {
        return processingLeads
    }

    let tmp = processingLeads;

    if(processingLeadProcess) {
      tmp = processingLeads.filter((lead) => lead.is_processed == processingLeadProcess);
    }

    return tmp;
  }

}
