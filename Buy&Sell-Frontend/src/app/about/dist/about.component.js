"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AboutComponent = void 0;
var core_1 = require("@angular/core");
var messages_component_1 = require("../messages/messages.component");
var AboutComponent = /** @class */ (function () {
    function AboutComponent(router, sharedService, _http) {
        this.router = router;
        this.sharedService = sharedService;
        this._http = _http;
        this.mobileoptions = false;
        this.hidden1 = false;
        this.hidden2 = true;
        this.NameOfTheUser = "";
        this.NameOfTheUser = localStorage.getItem('name');
    }
    AboutComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (localStorage.getItem('logstatus') != null) {
            this.hidden1 = true;
            this.hidden2 = false;
            console.log(localStorage.getItem('logstatus'));
            console.log(this.sharedService.getEmail());
            this._http.get(this.sharedService.getServer() + "/GetName?Email=" + this.sharedService.getEmail()).subscribe(function (data) {
                _this.loggeduser = (Object.values(data))[0];
            }, function (error) {
                console.log(error);
            });
        }
        else {
            this.hidden2 = true;
            this.hidden1 = false;
        }
    };
    AboutComponent.prototype.PostAnAdd = function () {
        this.router.navigate(['PostAnAdd']);
    };
    AboutComponent.prototype.onLogOut = function () {
        localStorage.clear();
        this.hidden2 = true;
        this.hidden1 = false;
        console.log("Local Storage Cleared");
        this.router.navigate(['']);
        console.log("Reloaded");
    };
    AboutComponent.prototype.MessageWindow = function () {
        var elem = document.getElementById("myDiv");
        elem.parentNode.removeChild(elem);
        this.LoadComponentHome = messages_component_1.MessagesComponent;
    };
    AboutComponent.prototype.gotoHome = function () {
        this.router.navigate(['']);
    };
    AboutComponent.prototype.gotSignupLogin = function () {
        this.router.navigate(['SignupLogin']);
    };
    AboutComponent = __decorate([
        core_1.Component({
            selector: 'app-about',
            templateUrl: './about.component.html',
            styleUrls: ['./about.component.css']
        })
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
