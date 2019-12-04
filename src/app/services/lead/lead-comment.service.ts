import { Injectable } from '@angular/core';
import { HttpService } from '../http-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadCommentService {

  constructor(private http: HttpService) { }

  getComments() {
    return this.http.get(environment.apiUrl + 'api/admin/leads_comments');
  }
}
