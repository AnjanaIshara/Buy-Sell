"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavigationBarComponent = void 0;
var core_1 = require("@angular/core");
var advertisement_grid_component_1 = require("../advertisement-grid/advertisement-grid.component");
var messages_component_1 = require("../messages/messages.component");
var NavigationBarComponent = /** @class */ (function () {
    function NavigationBarComponent(sharedService, _http, config, router, _locaton) {
        this._http = _http;
        this.router = router;
        this._locaton = _locaton;
        this.mobileoptions = false;
        this.hidden1 = false;
        this.hidden2 = true;
        this.NameOfTheUser = "";
        this.images = [1, 2, 3];
        this.ServerUrl = sharedService.getServer();
        this.Email = sharedService.getEmail();
        config.interval = 2000;
        config.wrap = false;
        config.keyboard = false;
        config.pauseOnHover = false;
        config.wrap = true;
        this.NameOfTheUser = localStorage.getItem('name');
    }
    //images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
    NavigationBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.LoadComponentHome = advertisement_grid_component_1.AdvertisementGridComponent;
        if (localStorage.getItem('logstatus') != null) {
            this.hidden1 = true;
            this.hidden2 = false;
            console.log(localStorage.getItem('logstatus'));
            console.log(this.Email);
            this._http.get(this.ServerUrl + "/GetName?Email=" + this.Email).subscribe(function (data) {
                _this.loggeduser = (Object.values(data))[0];
            }, function (error) {
                console.log(error);
            });
        }
        else {
            this.hidden2 = true;
            this.hidden1 = false;
        }
        this._http.get(this.ServerUrl + "/ImageSlider").subscribe(function (data) {
            _this.imagesUrlObj = data;
            _this.images = _this.imagesUrlObj.result;
        }, function (error) {
            console.log('Error getting urls', error);
        });
    };
    NavigationBarComponent.prototype.onLogOut = function () {
        localStorage.clear();
        this.hidden2 = true;
        this.hidden1 = false;
        console.log("Local Storage Cleared");
        this.router.navigate(['']);
        this.LoadComponentHome = advertisement_grid_component_1.AdvertisementGridComponent;
        console.log("Reloaded");
    };
    NavigationBarComponent.prototype.PostAnAdd = function () {
        this.router.navigate(['PostAnAdd']);
    };
    NavigationBarComponent.prototype.MessageWindow = function () {
        var elem = document.getElementById("myDiv");
        elem.parentNode.removeChild(elem);
        this.LoadComponentHome = messages_component_1.MessagesComponent;
    };
    NavigationBarComponent.prototype.gotoHome = function () {
        this.router.navigate(['']);
    };
    NavigationBarComponent = __decorate([
        core_1.Component({
            selector: 'app-navigation-bar',
            templateUrl: './navigation-bar.component.html',
            styleUrls: ['./navigation-bar.component.css']
        })
    ], NavigationBarComponent);
    return NavigationBarComponent;
}());
exports.NavigationBarComponent = NavigationBarComponent;
