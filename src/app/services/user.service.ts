import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpService } from './http-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  deleteUser(user: User) {
    return this.http.delete(environment.apiUrl + 'api/admin/users/' + user.id);
  }
  
  storeUser(user: User) {
    return this.http.post(environment.apiUrl + 'api/admin/users', user);
  }

  constructor(private http: HttpService) {
    
  }

  getUsers () {
    return this.http.get(environment.apiUrl + 'api/admin/users/get/list');
  }
}
