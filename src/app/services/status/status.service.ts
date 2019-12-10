import { Injectable } from '@angular/core';
import { HttpService } from '../http-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpService) { 

  }

  getStatuses() {
    return this.http.get(environment.apiUrl + 'api/admin/statuses');
  }
}
