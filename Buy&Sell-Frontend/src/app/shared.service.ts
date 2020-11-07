import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class SharedService {
  MobileNumber;
  Password;
  TypeOfLogin;
  Email;
  ServerUrl;
  status;
  AddID;
  arrLatLong;
  AddDialogIndex;
  AddvetisementRecipient;
  LoadChatOf;
  constructor() { 
    this.MobileNumber={};
    this.TypeOfLogin='';
    this.Email='';
    this.status=false;
    this.AddID='';
    this.arrLatLong=[];
    this.AddvetisementRecipient="";
    //this.ServerUrl='http://ec2-18-222-97-152.us-east-2.compute.amazonaws.com:8080';
    this.ServerUrl='http://localhost:8080'
  }
  setMobileNumber(val:object){
    this.MobileNumber=val;
  }
  setType(val:string){
    this.TypeOfLogin=val;
  }
  setStatus(val:boolean){
    this.status=val;
  }
  setEmail(val:string){
    this.Email=val;
  }
  setAddId(val:string){
    this.AddID=val;
  }
  setLatLong(lat:number,lng:number){
    this.arrLatLong=[lat,lng];
  }
  setDialgIndex(val:string){
    this.AddDialogIndex=val;
  }
  setAddvetisementRecipient(val:string){
    this.AddvetisementRecipient=val;
  }
  setLoadChatOf(val:string){
    this.LoadChatOf=val;
  }
  getLoadChatOf(){
    return this.LoadChatOf;
  }
  getAddvetisementRecipient(){
    return this.AddvetisementRecipient;
  }
  getDialogIndex(){
    return this.AddDialogIndex;
  }
  getMobileNumber(){
    return this.MobileNumber;
  }
  getType(){
    return this.TypeOfLogin;
  }
  getEmail(){
    return this.Email;
  }
  getServer(){
    return this.ServerUrl;
  }
  getStatus(){
    return this.status;
  }
  getAddId(){
    return this.AddID;
  }
  getLatlng(){
    return this.arrLatLong;
  }
  getLat(){
    return this.arrLatLong[0];
  }
  getLng(){
    return this.arrLatLong[1];
  }
  
}
