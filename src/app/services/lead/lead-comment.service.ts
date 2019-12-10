import { Injectable } from '@angular/core';
import { HttpService } from '../http-service';
import { environment } from 'src/environments/environment';
import { LeadComment } from 'src/app/models/leadComment';

@Injectable({
  providedIn: 'root'
})
export class LeadCommentService {

  constructor(private http: HttpService) { }

  getComments(id : number) {
    return this.http.get(environment.apiUrl + 'api/admin/leads/' + id);
  }

  storeLeadComment(lead: LeadComment) {
    return this.http.post(environment.apiUrl + 'api/admin/comments', lead );
  }
}
