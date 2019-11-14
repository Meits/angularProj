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
          id : 1,
          name : "Shop 1",

        },
        {
          id : 2,
          name : "Shop 2",

        },
        {
          id : 3,
          name : "Shop 3",

        },
    ];
  }
}
