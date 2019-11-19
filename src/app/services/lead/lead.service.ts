import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Lead } from 'src/app/models/lead';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http-service';

@Injectable({
  providedIn: 'root'
})
export class LeadService  {
  
  
  constructor(private http: HttpService) {
    
  }

  checkLead(lead: Lead) {
    let options = {}; 
    return this.http.post(environment.apiUrl + 'api/admin/leads/create/check', lead );
  }
  
  udateLead(lead: Lead) {
    return this.http.put(environment.apiUrl + 'api/admin/leads/' + lead.id, lead );
  }
  
  addSaleCount() {
    return this.http.get(environment.apiUrl + 'api/admin/leads/addSale/count');
  }

  storeLead(lead: Lead) {
    return this.http.post(environment.apiUrl + 'api/admin/leads', lead );
  }

}
