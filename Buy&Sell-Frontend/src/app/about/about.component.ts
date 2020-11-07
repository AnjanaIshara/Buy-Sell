import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
import {MessagesComponent} from '../messages/messages.component';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  mobileoptions = false;
  hidden1 = false;
  hidden2 = true;
  loggeduser: string;
  NameOfTheUser:string="";
  LoadComponentHome:any;
  constructor(private router: Router,private sharedService: SharedService,private _http: HttpClient) { 
    this.NameOfTheUser=localStorage.getItem('name');
  }

  ngOnInit(): void {
    if (localStorage.getItem('logstatus') != null) {
      this.hidden1 = true;
      this.hidden2 = false;
      console.log(localStorage.getItem('logstatus'));
      console.log(this.sharedService.getEmail());
      this._http.get(`${this.sharedService.getServer()}/GetName?Email=${this.sharedService.getEmail()}`).subscribe(
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
  }
  PostAnAdd(){

    this.router.navigate(['PostAnAdd']);
  }
  onLogOut(): void {
    localStorage.clear();
    this.hidden2 = true;
    this.hidden1 = false;
    console.log("Local Storage Cleared");
    this.router.navigate(['']);
    console.log("Reloaded");

  }
  MessageWindow(){
    var elem = document.getElementById("myDiv");
    elem.parentNode.removeChild(elem);
    this.LoadComponentHome=MessagesComponent;
  }
  gotoHome(){
    this.router.navigate(['']);
  }
  gotSignupLogin(){
    this.router.navigate(['SignupLogin']);
  }

}
