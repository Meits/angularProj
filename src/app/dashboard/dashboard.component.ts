import { Component, OnInit } from '@angular/core';
import { LeadService } from '../services/lead/lead.service';
import { Lead } from '../models/lead';
//import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  processingLeads : Array<Lead>;
  nLeads : Array<Lead>;
  dLeads : Array<Lead>;


  customOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
        touchDrag: true, 
        mouseDrag: true,
        dots: true
      },
      940: {
        items: 3, 
        touchDrag: false, 
        mouseDrag: false
      }
    },
    nav: true
  }

  
  constructor(
    private leadService : LeadService
    
    ) { 

    }

  ngOnInit() {
    this.leadService.getLeads().subscribe((data) => {
      this.processingLeads = data.leads.process;
      this.nLeads = data.leads.new;
      this.dLeads = data.leads.done;
    });
  }

}
