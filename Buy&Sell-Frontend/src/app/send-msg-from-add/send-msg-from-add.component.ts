import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-send-msg-from-add',
  templateUrl: './send-msg-from-add.component.html',
  styleUrls: ['./send-msg-from-add.component.css']
})
export class SendMsgFromAddComponent implements OnInit {
  addID:string="";
  constructor(private _sharedService:SharedService,
    private _http: HttpClient) {
    this.addID=_sharedService.getDialogIndex();
   }

  ngOnInit(): void {

  }
  current = new Date();
  

  
  msg:string="";
  messageobj:any;
  OnMessage(){
    //console.log(`Send From ${localStorage.getItem("email")} as  "${this.msg}" to ${this._sharedService.getAddvetisementRecipient()}`);
    this.current.setHours(0);
    this.current.setMinutes(0);
    this.current.setSeconds(0);
    this.current.setMilliseconds(0);
    this.messageobj={
      To:this._sharedService.getAddvetisementRecipient(),
      From:localStorage.getItem("email"),
      Message:this.msg,
      Timestamp: firebase.firestore.Timestamp.now(),
    }
    console.log(this.messageobj);

    this._http.post<any>(`${this._sharedService.getServer()}/message`,this.messageobj).subscribe(data=>{
    console.log(data);
    
    });

    this.msg="";
  }

}
