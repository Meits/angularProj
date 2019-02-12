import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Source } from './models/source';

@Injectable({
  providedIn: 'root'
})

export class SourcesService {
  
  deleteSource(source: Source): any {
    return this.http.delete('http://localhost:8000/sources/' + source._id );
  }
  

  constructor(private http : HttpClient) { }

  updateSource(source: Source): any {
    return this.http.put<Source>('http://localhost:8000/sources/' + source._id, source );
  }

  saveSource(source: Source) {

    let httpHeaders = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('Cache-Control', 'no-cache'); 
    let options = {
      headers: httpHeaders
    }; 
    return this.http.post<Source>('http://localhost:8000/sources', source,options );
  }

  getServices () {
    return this.http.get<Array<Source>>('http://localhost:8000/sources');
  }
}
