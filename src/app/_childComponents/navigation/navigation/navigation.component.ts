import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from "@angular/common";
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Navigation } from 'src/app/models/navigation';
import { filter } from 'rxjs/operators';
 
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {

  navMenu : boolean = true;
  navigation : Array<Navigation>;


  
  constructor(private router: Router, private location: Location, private navigationService : NavigationService) { 
    
    router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd)
    )
    .subscribe((url:any) => {
      if(url.url && url.url.indexOf("login") > 0) {
        this.navMenu = false;
      }
      else if(url.url) {
        this.navMenu = true;
      }

      if(!this.navigation && sessionStorage.getItem('currentUser')) {
        this.getMenu();
      }

    })

  }

  getMenu() {
    this.navigationService.getNavigation()
    .subscribe((data: Array<Navigation>) =>  {
      this.navigation = data;
    });
  }

  ngOnInit() {
    this.getMenu();
  }

}
