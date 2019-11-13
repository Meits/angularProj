import { Injectable } from '@angular/core';
import { PreloaderService } from './services/preloader.service';

@Injectable({
  providedIn: 'root'
})

export class UnitsService {

  constructor(private preloaderService: PreloaderService) { }

  getUnits () {

    return [
        {
          id : 2,
          name : "OLX",

        },
        {
          id : 3,
          name : "Instagramm",

        },
    ];
  }
}
