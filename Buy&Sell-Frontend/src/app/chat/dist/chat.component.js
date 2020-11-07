"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatComponent = void 0;
var core_1 = require("@angular/core");
var firebase = require("firebase");
var ChatComponent = /** @class */ (function () {
    function ChatComponent(_sharedService, _http, eventEmitterService) {
        this._sharedService = _sharedService;
        this._http = _http;
        this.eventEmitterService = eventEmitterService;
        this.ContactList = [];
        this.owner = "";
        this.sender = "";
        this.receiver = "";
        this.msg = "";
        this.reference = [];
        this.current = new Date();
        this.receiverEmail = "";
        this.owner = localStorage.getItem("Email");
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.eventEmitterService.subsVar == undefined) {
            this.eventEmitterService.subsVar = this.eventEmitterService.
                invokeFirstComponentFunction.subscribe(function (name) {
                _this.firstFunction();
            });
        }
    };
    ChatComponent.prototype.OnMessage = function () {
        this.current.setHours(0);
        this.current.setMinutes(0);
        this.current.setSeconds(0);
        this.current.setMilliseconds(0);
        this.messageobj = {
            To: this._sharedService.getLoadChatOf(),
            From: localStorage.getItem("email"),
            Content: this.msg,
            Timestamp: firebase.firestore.Timestamp.now()
        };
        console.log(this.messageobj);
        this._http.post(this._sharedService.getServer() + "/chatting", this.messageobj).subscribe(function (data) {
            console.log(data);
        });
        this.msg = "";
    };
    ChatComponent.prototype.firstFunction = function () {
        var _this = this;
        this.sender = localStorage.getItem("name");
        this.receiver = this._sharedService.getLoadChatOf();
        this.owner = localStorage.getItem("email");
        this._http.get(this._sharedService.getServer() + "/getChatContent?To=" + this._sharedService.getLoadChatOf() + "&From=" + localStorage.getItem("name"))
            .subscribe(function (data) {
            console.log("Chat will be loaded");
            _this.MESSAGES = data;
        });
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'app-chat',
            templateUrl: './chat.component.html',
            styleUrls: ['./chat.component.css']
        })
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
