import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { LocationServiceService } from '../location-service.service';

import { BasicDescriptions } from '../basic-descriptions';
import { AddPreviewComponent } from '../add-preview/add-preview.component'
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import{MatDialog} from '@angular/material/dialog';
import {MapViewComponent} from '../map-view/map-view.component';
@Component({
  selector: 'app-post-an-advertisement',
  templateUrl: './post-an-advertisement.component.html',
  styleUrls: ['./post-an-advertisement.component.scss'],

})



export class PostAnAdvertisementComponent implements OnInit {
  hidden1 = false;
  hidden2 = true;
  Email: string;
  mobileoptions = false;
  loggeduser: string;
  ServerUrl: string;
  latitude = 6.9271;
  longitude = 79.8612;
  basichidden: boolean;
  abouthidden: boolean;
  prevhidden: boolean;
  selected: any;
  BaseDetails: any;
  dummyComponent = AddPreviewComponent;
  imgFileNames=[];
  cats = ['Electronics', 'Property', 'Grocery', 'Other'];


  files: File[] = [];
  ///////////////////////////////Advertisement preview section //////////////////////////////
images=[];
  img = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  NameOfTheUser:string="";
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  //////////////////////////////////End of the Add preview///////////////////////////////////

  constructor(private router: Router, private sharedService: SharedService,
    private _http: HttpClient, private _locationService: LocationServiceService,
    private _dialog :MatDialog) {

    this.Email = localStorage.getItem('email');
    this.ServerUrl = sharedService.getServer();
    this.NameOfTheUser=localStorage.getItem('name');
    this._locationService.getPosition().then(pos => {


    });

    this.basichidden = false;
    this.abouthidden = true;
    this.prevhidden = true;
    this.BaseDetails = new BasicDescriptions('', this.Email, '', '', '', 0, '',null ,null , null,[]);



  }


  onSelect(event) {

    console.log(event);

    this.files.push(...event.addedFiles);



    const formData = new FormData();



    for (var i = 0; i < this.files.length; i++) {

      formData.append("fileArr", this.files[i]);
      this.imgFileNames.push(this.files[i].name);

    }
    
    formData.append('Email', this.Email);
    this._http.post(`${this.ServerUrl}/AddImages`, formData)

      .subscribe(res => {

        console.log(res);

        alert('Uploaded Successfully.');

      })

  }



  onRemove(event) {

    console.log(event);

    this.files.splice(this.files.indexOf(event), 1);

  }

  ngOnInit(): void {
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
    console.log(`in the posst add componrnet->${this.Email}`);

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
    console.log("From post add");
    this.router.navigate(['Messages']);
  }
 
  PostAnAdd() {
    console.log(this.Email);
    this.router.navigate(['PostAnAdd']);
  }
  District(any) {
    this.latitude = any[0];
    this.longitude = any[1];
  }
  FuncBasic() {
    this.basichidden = false;
    this.abouthidden = true;
    this.prevhidden = true;
  }

  OnChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.sharedService.setLatLong(event.coords.lat,event.coords.lng);
    this.BaseDetails.Latitude = this.latitude;
    this.BaseDetails.Longitude = this.longitude;

  }
  AboutItem() {
    this.basichidden = true;
    this.abouthidden = false;
    this.prevhidden = true;
  }
  PrevAdd() {
    this._http.get(`${this.ServerUrl}/AddvImages`).subscribe(
      data=>{
        console.log(data);
      }
    )
    this.basichidden = true;
    this.abouthidden = true;
    this.prevhidden = false;
    this.BaseDetails.Latitude=this.sharedService.getLat();
    this.BaseDetails.Longitude=this.sharedService.getLng();
    this.BaseDetails.ImageFilenames=this.imgFileNames;
    console.log(typeof (this.BaseDetails))
    this._http.post(`${this.ServerUrl}/PostAdd`, this.BaseDetails).subscribe(
      data => {
        console.log(data);
        this.sharedService.setAddId(data["ID"]);
        this.sharedService.setEmail(data["UserEmail"]);
        this.images=data["IMUrl"];
        console.log(this.images);

      },
      error => {
        console.log(error);
      }
    )
      

  }
  gotoHomepage(){
    this.router.navigate(['']);
  }
  OpenMap(){
    this._dialog.open(MapViewComponent);
  }

}
