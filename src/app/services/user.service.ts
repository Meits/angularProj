import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpService } from './http-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) {
    
  }

  getUsers () {
    return this.http.get(environment.apiUrl + 'api/admin/users/get/list');
  }
}
