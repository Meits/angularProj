import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {



  title = 'crmApp';

  navMenu : boolean = true;

  constructor(private router: Router, private location: Location) { 
    
    router.events.subscribe((url:any) => {
      if(url.url && url.url.indexOf("login") > 0) {
        this.navMenu = false;
      }
      else if(url.url) {
        this.navMenu = true;
      }
    });

  

  }

  ngOnInit() {
  }
}
