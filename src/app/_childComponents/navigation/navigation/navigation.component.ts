import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
 
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  navMenu : boolean = true;

  constructor(private router: Router, private location: Location) { 
    
    router.events.subscribe((url:any) => {
      if(url.url && url.url.indexOf("login") > 0) {
        this.navMenu = false;
      }
      else if(url.url) {
        this.navMenu = true;
      }
    })

  }

  ngOnInit() {
  }

}
