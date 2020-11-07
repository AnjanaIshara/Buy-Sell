import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import {AdvertisementGridComponent} from '../advertisement-grid/advertisement-grid.component';
import {MessagesComponent} from '../messages/messages.component';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  mobileoptions = false;
  ServerUrl: string;
  public imagesUrl;
  imagesUrlObj: any;
  Email: string;
  show: boolean;
  hidden1 = false;
  hidden2 = true;
  CurrentUser: any;
  LoadComponentHome:any;
  NameOfTheUser:string="";
  constructor(sharedService: SharedService, private _http: HttpClient, config: NgbCarouselConfig, private router: Router, public _locaton: Location) {
    this.ServerUrl = sharedService.getServer();
    this.Email = sharedService.getEmail();
    config.interval = 2000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    config.wrap = true;
    this.NameOfTheUser=localStorage.getItem('name');

  }

  loggeduser: string;
  images = [1, 2, 3];
  //images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  ngOnInit(): void {
    this.LoadComponentHome=AdvertisementGridComponent;
    if (localStorage.getItem('logstatus') != null) {
      this.hidden1 = true;
      this.hidden2 = false;
      console.log(localStorage.getItem('logstatus'));
      console.log(this.Email);
      this._http.get(`${this.ServerUrl}/GetName?Email=${this.Email}`).subscribe(
        data => {

          this.loggeduser = (Object.values(data))[0];
        },
        error => {
          console.log(error);
        }

      );
    }
    else {

      this.hidden2 = true;
      this.hidden1 = false;

    }


    this._http.get(`${this.ServerUrl}/ImageSlider`).subscribe(
      data => {
        this.imagesUrlObj = data;
        this.images = this.imagesUrlObj.result;
      },
      error => {
        console.log('Error getting urls', error)
      },
    )

  }



  onLogOut(): void {
    localStorage.clear();
    this.hidden2 = true;
    this.hidden1 = false;
    console.log("Local Storage Cleared");
    this.router.navigate(['']);
    this.LoadComponentHome=AdvertisementGridComponent;
    console.log("Reloaded");

  }
  PostAnAdd(){

    this.router.navigate(['PostAnAdd']);
  }
  MessageWindow(){
    var elem = document.getElementById("myDiv");
    elem.parentNode.removeChild(elem);
    this.LoadComponentHome=MessagesComponent;
  }
  gotoHome(){
    this.router.navigate(['']);
  }

}
