import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-navigation-bar',
  templateUrl: './mobile-navigation-bar.component.html',
  styleUrls: ['./mobile-navigation-bar.component.css']
})
export class MobileNavigationBarComponent implements OnInit {

  constructor(private router: Router ) { 
    this.router.navigate[''];

  }

  ngOnInit(): void {

  }
  

}
