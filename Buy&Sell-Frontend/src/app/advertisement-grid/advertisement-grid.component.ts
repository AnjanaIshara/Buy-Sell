import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { SendMsgFromAddComponent } from '../send-msg-from-add/send-msg-from-add.component';
import {MapforaddComponent} from '../mapforadd/mapforadd.component';
import {MapViewComponent}from '../map-view/map-view.component';
@Component({
  selector: 'app-advertisement-grid',
  templateUrl: './advertisement-grid.component.html',
  styleUrls: ['./advertisement-grid.component.css'],
  providers: [NgbCarouselConfig]
})
export class AdvertisementGridComponent implements OnInit {
  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
  selectedCategory:string='All'
  searchString:string='any'
  objArr:any;
  show:boolean;
  enableimageupload:boolean;
  selectedFile:File=null;
  
  constructor(config: NgbCarouselConfig,private _sharedService:SharedService, private _http: HttpClient,public dialog:MatDialog) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
    
   }
   selectChangeHandler(event:any){
      this.selectedCategory=event.target.value;
      console.log(`Selected category is ${this.selectedCategory}`);
   }
   getSearchQuery(){
     this.searchString=((document.getElementById("searchQuery") as HTMLInputElement).value)
     console.log(`Selected Search string  is ${this.searchString}`);
     this.LoadAdvertisements();
   }
   selectImage(){
     
   }
   LoadAdvertisements(){
     
    this._http.get(`${this._sharedService.getServer()}/loadgrid?category=${this.selectedCategory}&searchstr=${this.searchString}`).subscribe(
      data => {
        console.log(data);
        this.objArr=data;
        if(this.objArr.length==0){
          console.log("Error occured");
          this.show=true;
        }
        else{
          console.log("Good to go");
          this.show=false;
        }
        
      },
      error => {
        console.log(error);
      }

    );
   }
   onFileSelected(event){
    let elem: HTMLElement = document.getElementById('fileid');
    elem.setAttribute("style", "background-color:#cdf0c6;");
    this.selectedFile=<File>event.target.files[0];
    this.enableimageupload=true;
  }
  onUpload(){
    console.log("image uploading step");
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    this._http.post(`${this._sharedService.getServer()}/imageclass`, formData).subscribe(
      (res)=>{
        console.log(res["message"]);

        
        if(res["message"]=="Not found"){
          this.objArr=null;
          const app = document.getElementById("NotFound");
          const p = document.createElement("h2");
          p.textContent="Currently ";
          res["content"].forEach(function (value) {
          p.textContent+=value+" ";
          }); 
          p.textContent+=" are not found in the database. ";
          app?.appendChild(p);
          console.log(res["content"]);
          console.log("Error occured");
          this.show=true;
        }
        else{
          this.objArr=res["content"];
          console.log("Good to go");
          this.show=false;
        }
        
      },
     
      (err)=>{
        console.log("Error in classification of image");
      }
    );
     
        
  }
  GetIndex(i){
    console.log(this.objArr[i].AddID);
    this._sharedService.setAddvetisementRecipient(this.objArr[i].Email);
    this._sharedService.setDialgIndex(this.objArr[i].AddID);
    this.dialog.open(SendMsgFromAddComponent);
  }
  OpenMap(i){
    this._sharedService.setLatLong(this.objArr[i].Latitude,this.objArr[i].Longitude);
    this.dialog.open(MapViewComponent);
  }
  ngOnInit(): void {
    this.LoadAdvertisements();
  }

}
