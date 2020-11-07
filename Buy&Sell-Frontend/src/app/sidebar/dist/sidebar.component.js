"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidebarComponent = void 0;
var core_1 = require("@angular/core");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(_sharedService, _http, eventEmitterService) {
        this._sharedService = _sharedService;
        this._http = _http;
        this.eventEmitterService = eventEmitterService;
        this.ContactList = [];
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._http.get(this._sharedService.getServer() + "/getChatList?Email=" + localStorage.getItem("email")).subscribe(function (data) {
            data["Contacts"].forEach(function (element) {
                _this.ContactList.push(element);
            });
            console.log(_this.ContactList);
        });
    };
    SidebarComponent.prototype.SendTheRecipient = function (number) {
        this._sharedService.setLoadChatOf(number);
        this.eventEmitterService.onFirstComponentButtonClick();
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.css']
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
