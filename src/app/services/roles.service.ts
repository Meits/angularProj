import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  getRoles() {
    return this.http.get(environment.apiUrl + 'api/admin/roles');
  }

  constructor(private http: HttpService) { }

}
