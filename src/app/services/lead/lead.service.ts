import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Lead } from 'src/app/models/lead';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadService extends BaseService {
  
  addSaleCount() {
    return this.http.get<any>(environment.apiUrl + 'api/admin/leads/addSale/count');
  }

  storeLead(lead: Lead) {
    let options = {}; 
    return this.http.post<Lead>(environment.apiUrl + 'api/admin/leads', lead, options );
  }

}
