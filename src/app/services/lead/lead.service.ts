import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Lead } from 'src/app/models/lead';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http-service';

@Injectable({
  providedIn: 'root'
})
export class LeadService  {
  getArchiveLeads(page : number) {
    return this.http.get(environment.apiUrl + 'api/admin/leads/archive/index'+"?page=" + page);
  }
  addQuality(lead: any) {
    return this.http.put(environment.apiUrl + 'api/admin/leads/update/quality/' + lead.id, lead );
  }
  
  
  
  constructor(private http: HttpService) {
    
  }
  
  getLeads() {
    return this.http.get(environment.apiUrl + 'api/admin/leads');
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
