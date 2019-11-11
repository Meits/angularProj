import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Source } from './models/source';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SourcesService {

  sources: Array<Source>;
  
  constructor(private http : HttpClient) {
    //this.getServices();
   }

  deleteSource(source: Source): any {
    return this.http.delete(environment.apiUrl + 'api/admin/sources/' + source.id );
  }
  
  updateSource(source: Source): any {
    return this.http.put<Source>(environment.apiUrl + 'api/admin/sources/' + source.id, source );
  }

  saveSource(source: Source) {
    let options = {}; 
    return this.http.post<Source>(environment.apiUrl + 'api/admin/sources', source, options );
  }

  getServices () {
    return this.http.get<Array<Source>>(environment.apiUrl + 'api/admin/sources');
  }

  getService(id: any, sources : Array<Source>): Source {
    let result : Source;
    sources.forEach(function(item : Source) {
        if(item.id == id) {
          result = {...item};
        }
    });

    return result;
  }

  getServiceIndex(id: any, sources : Array<Source>): number {
    let result : number;
    sources.forEach(function(item : Source, index : number) {
        if(item.id == id) {
          result = index;
        }
    });

    return result;
  }

  changeSources(sources : Array<Source>, source : Source) {
    for(var i = 0; i < sources.length; i++) {
        if(sources[i].id == source.id) {
            sources.splice(i,1,source);
        }
    }
  }
}
