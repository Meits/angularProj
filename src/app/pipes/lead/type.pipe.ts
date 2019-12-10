import { Pipe, PipeTransform } from '@angular/core';
import { Lead } from 'src/app/models/lead';

@Pipe({
  name: 'type',
  //pure: false
})
export class TypePipe implements PipeTransform {

  transform(leads: Array<Lead>, status : number): any {
    
    console.log('pipe');
    //return leads;
    if(leads) {    
      //console.log(leads);  
      return leads.filter(function(lead) {
        return lead.status_id == status
      });
    }
    return [];

  }

}
