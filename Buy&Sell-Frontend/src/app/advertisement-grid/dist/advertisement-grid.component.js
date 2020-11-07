"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdvertisementGridComponent = void 0;
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var send_msg_from_add_component_1 = require("../send-msg-from-add/send-msg-from-add.component");
var map_view_component_1 = require("../map-view/map-view.component");
var AdvertisementGridComponent = /** @class */ (function () {
    function AdvertisementGridComponent(config, _sharedService, _http, dialog) {
        this._sharedService = _sharedService;
        this._http = _http;
        this.dialog = dialog;
        this.images = [700, 533, 807, 124].map(function (n) { return "https://picsum.photos/id/" + n + "/900/500"; });
        this.selectedCategory = 'All';
        this.searchString = 'any';
        this.selectedFile = null;
        config.interval = 10000;
        config.wrap = false;
        config.keyboard = false;
        config.pauseOnHover = false;
    }
    AdvertisementGridComponent.prototype.selectChangeHandler = function (event) {
        this.selectedCategory = event.target.value;
        console.log("Selected category is " + this.selectedCategory);
    };
    AdvertisementGridComponent.prototype.getSearchQuery = function () {
        this.searchString = (document.getElementById("searchQuery").value);
        console.log("Selected Search string  is " + this.searchString);
        this.LoadAdvertisements();
    };
    AdvertisementGridComponent.prototype.selectImage = function () {
    };
    AdvertisementGridComponent.prototype.LoadAdvertisements = function () {
        var _this = this;
        this._http.get(this._sharedService.getServer() + "/loadgrid?category=" + this.selectedCategory + "&searchstr=" + this.searchString).subscribe(function (data) {
            console.log(data);
            _this.objArr = data;
            if (_this.objArr.length == 0) {
                console.log("Error occured");
                _this.show = true;
            }
            else {
                console.log("Good to go");
                _this.show = false;
            }
        }, function (error) {
            console.log(error);
        });
    };
    AdvertisementGridComponent.prototype.onFileSelected = function (event) {
        var elem = document.getElementById('fileid');
        elem.setAttribute("style", "background-color:#cdf0c6;");
        this.selectedFile = event.target.files[0];
        this.enableimageupload = true;
    };
    AdvertisementGridComponent.prototype.onUpload = function () {
        var _this = this;
        console.log("image uploading step");
        var formData = new FormData();
        formData.append('image', this.selectedFile);
        this._http.post(this._sharedService.getServer() + "/imageclass", formData).subscribe(function (res) {
            console.log(res["message"]);
            if (res["message"] == "Not found") {
                _this.objArr = null;
                var app = document.getElementById("NotFound");
                var p_1 = document.createElement("h2");
                p_1.textContent = "Currently ";
                res["content"].forEach(function (value) {
                    p_1.textContent += value + " ";
                });
                p_1.textContent += " are not found in the database. ";
                app === null || app === void 0 ? void 0 : app.appendChild(p_1);
                console.log(res["content"]);
                console.log("Error occured");
                _this.show = true;
            }
            else {
                _this.objArr = res["content"];
                console.log("Good to go");
                _this.show = false;
            }
        }, function (err) {
            console.log("Error in classification of image");
        });
    };
    AdvertisementGridComponent.prototype.GetIndex = function (i) {
        console.log(this.objArr[i].AddID);
        this._sharedService.setAddvetisementRecipient(this.objArr[i].Email);
        this._sharedService.setDialgIndex(this.objArr[i].AddID);
        this.dialog.open(send_msg_from_add_component_1.SendMsgFromAddComponent);
    };
    AdvertisementGridComponent.prototype.OpenMap = function (i) {
        this._sharedService.setLatLong(this.objArr[i].Latitude, this.objArr[i].Longitude);
        this.dialog.open(map_view_component_1.MapViewComponent);
    };
    AdvertisementGridComponent.prototype.ngOnInit = function () {
        this.LoadAdvertisements();
    };
    AdvertisementGridComponent = __decorate([
        core_1.Component({
            selector: 'app-advertisement-grid',
            templateUrl: './advertisement-grid.component.html',
            styleUrls: ['./advertisement-grid.component.css'],
            providers: [ng_bootstrap_1.NgbCarouselConfig]
        })
    ], AdvertisementGridComponent);
    return AdvertisementGridComponent;
}());
exports.AdvertisementGridComponent = AdvertisementGridComponent;
