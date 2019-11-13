import { Injectable } from '@angular/core';
import { Source } from './models/source';
import { environment } from 'src/environments/environment';
import { BaseService } from './services/base.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SourcesService extends BaseService{

  sources: Array<Source>;
  

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
    this.requestInterceptor();
    return this.http.get<Array<Source>>(environment.apiUrl + 'api/admin/sources').pipe(finalize(() => {
      this.responseInterceptor();
    }));
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
