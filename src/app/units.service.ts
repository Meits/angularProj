import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UnitsService {

  constructor() { }

  getUnits () {

    return [
        {
          _id : "223234234",
          name : "OLX",

        },
        {
          _id : "345345345",
          name : "Instagramm",

        },
    ];
  }
}
