"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VerifyComponent = void 0;
var core_1 = require("@angular/core");
var verifycodedata_1 = require("../verifycodedata");
var CryptoJS = require("crypto-js");
var VerifyComponent = /** @class */ (function () {
    function VerifyComponent(sharedService, _http, router) {
        this._http = _http;
        this.router = router;
        this.verificationDetails = new verifycodedata_1.Verifycodedata('', this.Mobile);
        this.Mobile = sharedService.getMobileNumber().MobileNumber;
        //console.log(`The ENCRYPTED password is ${sharedService.getMobileNumber().Password}`);
        this.Password = sharedService.getMobileNumber().Password;
        this.TypeOfthe = sharedService.getType();
        this.Email = sharedService.getEmail();
        this.ServerUrl = sharedService.getServer();
    }
    VerifyComponent.prototype.VerifyData = function () {
        var _this = this;
        if (this.TypeOfthe == 'Signup') {
            this.EncryptPw = (CryptoJS.AES.encrypt(this.Password.trim(), this.verificationDetails.Code.trim())).toString().trim();
            this._http.get(this.ServerUrl + "/Verify?Code=" + this.verificationDetails.Code + "&MobileNumber=" + this.Mobile + "&EncPword=" + this.EncryptPw + "&Type=" + this.TypeOfthe)
                .subscribe(function (data) {
                console.log('Success in verification code 1', data);
                localStorage.setItem('logstatus', 'true');
                _this.router.navigate(['./']);
            }, function (error) { console.log('Error!', error); });
        }
        else {
            this._http.get(this.ServerUrl + "/LoginVerify?Code=" + this.verificationDetails.Code + "&Email=" + this.Email + "&Type=" + this.TypeOfthe)
                .subscribe(function (data) {
                console.log('Success in login verification code 2', data);
                localStorage.setItem('logstatus', 'true');
                _this.router.navigate(['./']);
            }, function (error) { console.log('Error in login Verification', error); });
            this._http.get(this.ServerUrl + "/GetName?Email=" + this.Email).subscribe(function (data) {
                localStorage.setItem('name', (Object.values(data))[0]);
            }, function (error) {
                console.log(error);
            });
        }
    };
    VerifyComponent.prototype.ngOnInit = function () {
    };
    VerifyComponent = __decorate([
        core_1.Component({
            selector: 'app-verify',
            templateUrl: './verify.component.html',
            styleUrls: ['./verify.component.scss', 'st.css']
        })
    ], VerifyComponent);
    return VerifyComponent;
}());
exports.VerifyComponent = VerifyComponent;
