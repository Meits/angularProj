import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Source } from './models/source';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SourcesService {
  
  deleteSource(source: Source): any {
    return this.http.delete(environment.apiUrl + 'api/admin/sources/' + source.id );
  }
  

  constructor(private http : HttpClient) { }

  updateSource(source: Source): any {
    return this.http.put<Source>(environment.apiUrl + 'api/admin/sources/' + source.id, source );
  }

  saveSource(source: Source) {

    /*let httpHeaders = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Cache-Control', 'no-cache'); 
    let options = {
      headers: httpHeaders
    }; */

    let options = {
      
    };
    return this.http.post<Source>(environment.apiUrl + 'api/admin/sources/', source, options );
  }

  getServices () {
    return this.http.get<Array<Source>>(environment.apiUrl + 'api/admin/sources');
  }
}
