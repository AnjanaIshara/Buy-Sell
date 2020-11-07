"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignOrLoginComponent = void 0;
var core_1 = require("@angular/core");
var users_1 = require("../users");
var login_details_1 = require("../login-details");
var CryptoJS = require("crypto-js");
var login_error_dialog_box_component_1 = require("../login-error-dialog-box/login-error-dialog-box.component");
var SignOrLoginComponent = /** @class */ (function () {
    function SignOrLoginComponent(_confirm, _MobileSet, _shared, _http, router, LoginEDialogBox) {
        this._confirm = _confirm;
        this._MobileSet = _MobileSet;
        this._shared = _shared;
        this._http = _http;
        this.router = router;
        this.LoginEDialogBox = LoginEDialogBox;
        this.mobileoptions = false;
        this.countryHasError = true;
        this.userModel = new users_1.Users('', '', '', '', '');
        this.loginModel = new login_details_1.LoginDetails('', '');
    }
    SignOrLoginComponent.prototype.ValidateCountry = function (value) {
        if (value == "default") {
            this.countryHasError = true;
        }
        else {
            this.countryHasError = false;
        }
    };
    SignOrLoginComponent.prototype.SignupFunction = function () {
        var container = document.getElementById('container');
        container.classList.add("right-panel-active");
    };
    SignOrLoginComponent.prototype.SigninFunction = function () {
        var container = document.getElementById('container');
        container.classList.remove("right-panel-active");
    };
    SignOrLoginComponent.prototype.ngOnInit = function () {
        this.countries = [
            { Code: "+94", Name: "Sri Lanka" },
            { Code: "+91", Name: "India" }
        ];
    };
    SignOrLoginComponent.prototype.onSubmit = function () {
        localStorage.setItem("name", this.userModel.Name);
        localStorage.setItem("email", this.userModel.Email);
        this.userModel.MobileNumber = this.userModel.Country + this.userModel.MobileNumber.slice(1);
        console.log(this.userModel.MobileNumber);
        this._http.post(this._shared.getServer() + "/confirm", this.userModel)
            .subscribe(function (data) { return console.log('Success', data); }, function (error) { return console.log('Error!', error); });
        this._MobileSet.setMobileNumber(this.userModel);
        this._MobileSet.setType('Signup');
        this.router.navigate(['/Verify']);
    };
    SignOrLoginComponent.prototype.onLogin = function () {
        var _this = this;
        localStorage.setItem("email", this.loginModel.Email);
        this.loginModel.Password = (CryptoJS.AES.encrypt(this.loginModel.Password, this.loginModel.Email).toString().trim());
        this._MobileSet.setType('Login');
        this._MobileSet.setEmail(this.loginModel.Email);
        this._confirm.login(this.loginModel).subscribe(function (data) {
            //console.log(data.message);
            if (data.message == 'User Login Password Matched') {
                console.log('Going next stage');
                _this.router.navigate(['/Verify']);
            }
            else {
                console.log('Redirect to the login page');
                var dialogRef = _this.LoginEDialogBox.open(login_error_dialog_box_component_1.LoginErrorDialogBoxComponent);
                dialogRef.afterClosed().subscribe(function (result) {
                    if (result == 'BackToThePage') {
                        _this.loginModel = new login_details_1.LoginDetails('', '');
                        _this.router.navigate(['/SignupLogin']);
                    }
                });
            }
        }, function (error) {
            console.log('Error in posting the login details', error);
            _this.LoginEDialogBox.open(login_error_dialog_box_component_1.LoginErrorDialogBoxComponent);
        });
    };
    SignOrLoginComponent = __decorate([
        core_1.Component({
            selector: 'app-sign-or-login',
            templateUrl: './sign-or-login.component.html',
            styleUrls: ['./sign-or-login.component.css']
        })
    ], SignOrLoginComponent);
    return SignOrLoginComponent;
}());
exports.SignOrLoginComponent = SignOrLoginComponent;
