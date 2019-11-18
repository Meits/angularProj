import { Injectable } from '@angular/core';
import { HttpService } from '../http-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  

  constructor(private http: HttpService) {
    
  }

  getNavigation() {
    return this.http.get(environment.apiUrl + 'api/admin/menus', null ,'full');
  }
  
}
