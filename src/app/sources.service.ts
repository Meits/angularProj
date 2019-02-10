import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Source } from './models/source';

@Injectable({
  providedIn: 'root'
})
/*
export interface ISource {
  title: string;
  _id: string;
}
*/
export class SourcesService {

  constructor(private http : HttpClient) { }

  getServices () {

    return this.http.get<Array<Source>>('http://localhost:8000/sources');

    /*return [
        {
          _id : "223234234",
          name : "OLX",

        },
        {
          _id : "345345345",
          name : "Instagramm",

        },
    ];*/
  }
}
