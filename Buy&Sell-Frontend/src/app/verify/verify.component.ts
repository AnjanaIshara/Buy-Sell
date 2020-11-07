import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Verifycodedata } from '../verifycodedata';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss','st.css']
})
export class VerifyComponent implements OnInit {
  Mobile: string;
  Password: string;
  EncryptPw: string;
  TypeOfthe: string;
  Email:string;
  ServerUrl:string;
  
  constructor(sharedService: SharedService, private _http: HttpClient, private router: Router) {

    this.Mobile = sharedService.getMobileNumber().MobileNumber;

    //console.log(`The ENCRYPTED password is ${sharedService.getMobileNumber().Password}`);
    this.Password = sharedService.getMobileNumber().Password;
    this.TypeOfthe = sharedService.getType();
    this.Email=sharedService.getEmail();
    this.ServerUrl=sharedService.getServer();
   

  }
  verificationDetails = new Verifycodedata('', this.Mobile);
  VerifyData() {
    if (this.TypeOfthe == 'Signup') {
      this.EncryptPw = (CryptoJS.AES.encrypt(this.Password.trim(), this.verificationDetails.Code.trim())).toString().trim();
      this._http.get(`${this.ServerUrl}/Verify?Code=${this.verificationDetails.Code}&MobileNumber=${this.Mobile}&EncPword=${this.EncryptPw}&Type=${this.TypeOfthe}`)
        .subscribe(
          data => {
            console.log('Success in verification code 1', data);
            localStorage.setItem('logstatus','true')
            this.router.navigate(['./'])
          },
          error => { console.log('Error!', error) },

        )
    }
    else{
      
      this._http.get(`${this.ServerUrl}/LoginVerify?Code=${this.verificationDetails.Code}&Email=${this.Email}&Type=${this.TypeOfthe}`)
      .subscribe(
        data=>{
          console.log('Success in login verification code 2',data);
          localStorage.setItem('logstatus','true');
          
          this.router.navigate(['./'])
        },
        error=>{console.log('Error in login Verification',error)},
      )
      this._http.get(`${this.ServerUrl}/GetName?Email=${this.Email}`).subscribe(
        data => {

          localStorage.setItem('name', (Object.values(data))[0]);
        },
        error => {
          console.log(error);
        }

      );


    }

  }



  ngOnInit(): void {
  }

}
