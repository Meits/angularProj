import { Component, OnInit } from '@angular/core';
import { LeadService } from '../services/lead/lead.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-analitics',
  templateUrl: './analitics.component.html',
  styleUrls: ['./analitics.component.sass']
})
export class AnaliticsComponent implements OnInit {

  constructor(
    private leadService : LeadService,
  ) { }

  dateStart : string;
  dateEnd : string;

  analiticsData : any;

  path : string = environment.apiUrl;


  public options: Pickadate.DateOptions = {
    clear: 'Clear', // Clear button text
    close: 'Ok',    // Ok button text
    today: 'Today', // Today button text
    closeOnClear: true,
    closeOnSelect: false,
    format: 'dd.mm.yyyy', // Visible date format (defaulted to formatSubmit if provided otherwise 'd mmmm, yyyy')
    formatSubmit: 'dd.mm.yyyy',   // Return value format (used to set/get value)
    onClose: () => {
      this.getAnalitics();
    },
    onOpen: () => {
      
    },
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10,    // Creates a dropdown of 10 years to control year,
  };

  ngOnInit() {

    let dateAnaliticsStart : Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    let dateAnaliticsEnd : Date = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    
    this.dateStart = this.dateHelper(dateAnaliticsStart);
    this.dateEnd = this.dateHelper(dateAnaliticsEnd);

    console.log(this.dateStart);

    this.getAnalitics();
  }

  dateHelper(value) {
    if(value) {
        return value.getDate() < 10 ? '0'+value.getDate() : value.getDate()  + "." + (value.getMonth()+1) + "." + value.getFullYear();
    }

    return null;
  }
  getAnalitics() {
    this.leadService.getAnalitics(this.dateStart, this.dateEnd).subscribe((data) => {
      this.analiticsData = data.leadsData;
      console.log(this.analiticsData);
    });
  }

}
