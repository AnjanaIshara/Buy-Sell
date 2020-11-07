import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { EventEmitterService } from '../event-emitter.service';   
import * as firebase from 'firebase';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  ContactList=[]
  owner="";
  constructor(
    private _sharedService:SharedService,
    private _http: HttpClient,
    private eventEmitterService: EventEmitterService
  ) { 
    this.owner=localStorage.getItem("Email");
  }
  
  ngOnInit(): void {
    
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeFirstComponentFunction.subscribe((name:string) => {    
        this.firstFunction();    
      });    
    } 
    
    
  }
  sender="";
  receiver="";
  msg:string="";
  MESSAGES:any;
  reference=[];
  messageobj:any;
  current = new Date();
  receiverEmail="";
  OnMessage(){
    this.current.setHours(0);
    this.current.setMinutes(0);
    this.current.setSeconds(0);
    this.current.setMilliseconds(0);
    this.messageobj={
      To:this._sharedService.getLoadChatOf(),
      From:localStorage.getItem("email"),
      Content:this.msg,
      Timestamp: firebase.firestore.Timestamp.now(),
    }
    console.log(this.messageobj);

    this._http.post<any>(`${this._sharedService.getServer()}/chatting`,this.messageobj).subscribe(data=>{
    console.log(data);
    
    
    });
    this.msg="";
  }
  firstFunction(){
    this.sender=localStorage.getItem("name");
    this.receiver=this._sharedService.getLoadChatOf();
    this.owner=localStorage.getItem("email");
    this._http.get(`${this._sharedService.getServer()}/getChatContent?To=${this._sharedService.getLoadChatOf()}&From=${localStorage.getItem("name")}`)
    .subscribe((data)=>{
      console.log("Chat will be loaded");
      this.MESSAGES=data;
     
      
    })
  }

}
