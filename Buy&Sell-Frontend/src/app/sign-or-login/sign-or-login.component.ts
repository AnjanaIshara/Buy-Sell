import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService } from '../confirmation.service';
import { Users } from '../users';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Countries } from '../Countries';
import { LoginDetails } from '../login-details';
import * as CryptoJS from 'crypto-js';
import { MatDialog } from '@angular/material/Dialog';
import {LoginErrorDialogBoxComponent} from '../login-error-dialog-box/login-error-dialog-box.component'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sign-or-login',
  templateUrl: './sign-or-login.component.html',
  styleUrls: ['./sign-or-login.component.css'],

})
export class SignOrLoginComponent implements OnInit {

  mobileoptions = false;
  countries: Countries[];
  countryHasError = true;



  constructor(private _confirm: ConfirmationService,
    private _MobileSet: SharedService,private _shared: SharedService,private _http:HttpClient,
    private router: Router,
    public LoginEDialogBox: MatDialog) {

  }

  ValidateCountry(value) {
    if (value == "default") {
      this.countryHasError = true;
    }
    else {
      this.countryHasError = false;
    }
  }

  SignupFunction() {
    const container = document.getElementById('container');
    container.classList.add("right-panel-active");
  }
  SigninFunction() {
    const container = document.getElementById('container');
    container.classList.remove("right-panel-active");
  }

  ngOnInit(): void {
    this.countries = [
      { Code: "+94", Name: "Sri Lanka" },
      { Code: "+91", Name: "India" }

    ];

  }
  userModel = new Users('', '', '', '', '');
  loginModel = new LoginDetails('', '');

  onSubmit() {
    localStorage.setItem("name",this.userModel.Name);
    localStorage.setItem("email",this.userModel.Email);
    this.userModel.MobileNumber = this.userModel.Country + this.userModel.MobileNumber.slice(1);
    console.log(this.userModel.MobileNumber);
    this._http.post<any>(`${this._shared.getServer()}/confirm`,this.userModel)
      .subscribe(
        data => console.log('Success', data),
        error => console.log('Error!', error)
      )
    this._MobileSet.setMobileNumber(this.userModel)
    this._MobileSet.setType('Signup')
    this.router.navigate(['/Verify'])
  }

  onLogin() {
    localStorage.setItem("email",this.loginModel.Email);

    this.loginModel.Password = (CryptoJS.AES.encrypt(this.loginModel.Password, this.loginModel.Email).toString().trim());
    this._MobileSet.setType('Login')
    this._MobileSet.setEmail(this.loginModel.Email);
    this._confirm.login(this.loginModel).subscribe(
      (data) => {
        //console.log(data.message);
        if (data.message == 'User Login Password Matched') {
          console.log('Going next stage');
          this.router.navigate(['/Verify'])
        } else {
          console.log('Redirect to the login page');
          let dialogRef=this.LoginEDialogBox.open(LoginErrorDialogBoxComponent);
          dialogRef.afterClosed().subscribe(result=>{
            if(result=='BackToThePage'){
              this.loginModel = new LoginDetails('', '');
              this.router.navigate(['/SignupLogin']);
            }
          })
        }
      },
      error => {
        console.log('Error in posting the login details', error);
        this.LoginEDialogBox.open(LoginErrorDialogBoxComponent)
      
    }
    )
  }


}
