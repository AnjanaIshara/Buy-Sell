"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SendMsgFromAddComponent = void 0;
var core_1 = require("@angular/core");
var firebase = require("firebase");
var SendMsgFromAddComponent = /** @class */ (function () {
    function SendMsgFromAddComponent(_sharedService, _http) {
        this._sharedService = _sharedService;
        this._http = _http;
        this.addID = "";
        this.current = new Date();
        this.msg = "";
        this.addID = _sharedService.getDialogIndex();
    }
    SendMsgFromAddComponent.prototype.ngOnInit = function () {
    };
    SendMsgFromAddComponent.prototype.OnMessage = function () {
        //console.log(`Send From ${localStorage.getItem("email")} as  "${this.msg}" to ${this._sharedService.getAddvetisementRecipient()}`);
        this.current.setHours(0);
        this.current.setMinutes(0);
        this.current.setSeconds(0);
        this.current.setMilliseconds(0);
        this.messageobj = {
            To: this._sharedService.getAddvetisementRecipient(),
            From: localStorage.getItem("email"),
            Message: this.msg,
            Timestamp: firebase.firestore.Timestamp.now()
        };
        console.log(this.messageobj);
        this._http.post(this._sharedService.getServer() + "/message", this.messageobj).subscribe(function (data) {
            console.log(data);
        });
        this.msg = "";
    };
    SendMsgFromAddComponent = __decorate([
        core_1.Component({
            selector: 'app-send-msg-from-add',
            templateUrl: './send-msg-from-add.component.html',
            styleUrls: ['./send-msg-from-add.component.css']
        })
    ], SendMsgFromAddComponent);
    return SendMsgFromAddComponent;
}());
exports.SendMsgFromAddComponent = SendMsgFromAddComponent;
