import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../units.service';
import { Services } from '@angular/core/src/view';
import { SourcesService } from '../sources.service';
import { Source } from '../models/source';



@Component({
  selector: 'app-gate',
  templateUrl: './gate.component.html',
  styleUrls: ['./gate.component.sass'],
  
})
export class GateComponent implements OnInit {

  constructor(private unitsService: UnitsService, private sourcesService : SourcesService) {
    
   }

  units: Array<object>;
  sources: Array<Source>;

  ngOnInit() {
    this.units = this.unitsService.getUnits();

    this.sourcesService.getServices()
    .subscribe((data: Array<Source>) =>  {
      this.sources = data;
    });
  }

}
