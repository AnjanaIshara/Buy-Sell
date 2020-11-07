import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service'; 
import { HttpClient } from '@angular/common/http';
import { EventEmitterService } from '../event-emitter.service';    

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  ContactList=[];
  constructor(private _sharedService:SharedService,
    private _http: HttpClient,
    private eventEmitterService: EventEmitterService  ) { }

  ngOnInit(): void {
    this._http.get(`${this._sharedService.getServer()}/getChatList?Email=${localStorage.getItem("email")}`).subscribe(data=>{
      data["Contacts"].forEach(element => {
          this.ContactList.push(element);
      }
      );  
      console.log(this.ContactList); 
    })
  }
  SendTheRecipient(number){
    this._sharedService.setLoadChatOf(number)
    this.eventEmitterService.onFirstComponentButtonClick();
  }

}
