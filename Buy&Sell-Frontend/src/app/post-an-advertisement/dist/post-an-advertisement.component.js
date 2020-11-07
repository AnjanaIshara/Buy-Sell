"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostAnAdvertisementComponent = void 0;
var core_1 = require("@angular/core");
var basic_descriptions_1 = require("../basic-descriptions");
var add_preview_component_1 = require("../add-preview/add-preview.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var map_view_component_1 = require("../map-view/map-view.component");
var PostAnAdvertisementComponent = /** @class */ (function () {
    //////////////////////////////////End of the Add preview///////////////////////////////////
    function PostAnAdvertisementComponent(router, sharedService, _http, _locationService, _dialog) {
        this.router = router;
        this.sharedService = sharedService;
        this._http = _http;
        this._locationService = _locationService;
        this._dialog = _dialog;
        this.hidden1 = false;
        this.hidden2 = true;
        this.mobileoptions = false;
        this.latitude = 6.9271;
        this.longitude = 79.8612;
        this.dummyComponent = add_preview_component_1.AddPreviewComponent;
        this.imgFileNames = [];
        this.cats = ['Electronics', 'Property', 'Grocery', 'Other'];
        this.files = [];
        ///////////////////////////////Advertisement preview section //////////////////////////////
        this.images = [];
        this.img = [62, 83, 466, 965, 982, 1043, 738].map(function (n) { return "https://picsum.photos/id/" + n + "/900/500"; });
        this.paused = false;
        this.unpauseOnArrow = false;
        this.pauseOnIndicator = false;
        this.pauseOnHover = true;
        this.NameOfTheUser = "";
        this.Email = localStorage.getItem('email');
        this.ServerUrl = sharedService.getServer();
        this.NameOfTheUser = localStorage.getItem('name');
        this._locationService.getPosition().then(function (pos) {
        });
        this.basichidden = false;
        this.abouthidden = true;
        this.prevhidden = true;
        this.BaseDetails = new basic_descriptions_1.BasicDescriptions('', this.Email, '', '', '', 0, '', null, null, null, []);
    }
    PostAnAdvertisementComponent.prototype.togglePaused = function () {
        if (this.paused) {
            this.carousel.cycle();
        }
        else {
            this.carousel.pause();
        }
        this.paused = !this.paused;
    };
    PostAnAdvertisementComponent.prototype.onSlide = function (slideEvent) {
        if (this.unpauseOnArrow && slideEvent.paused &&
            (slideEvent.source === ng_bootstrap_1.NgbSlideEventSource.ARROW_LEFT || slideEvent.source === ng_bootstrap_1.NgbSlideEventSource.ARROW_RIGHT)) {
            this.togglePaused();
        }
        if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === ng_bootstrap_1.NgbSlideEventSource.INDICATOR) {
            this.togglePaused();
        }
    };
    PostAnAdvertisementComponent.prototype.onSelect = function (event) {
        var _a;
        console.log(event);
        (_a = this.files).push.apply(_a, event.addedFiles);
        var formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
            formData.append("fileArr", this.files[i]);
            this.imgFileNames.push(this.files[i].name);
        }
        formData.append('Email', this.Email);
        this._http.post(this.ServerUrl + "/AddImages", formData)
            .subscribe(function (res) {
            console.log(res);
            alert('Uploaded Successfully.');
        });
    };
    PostAnAdvertisementComponent.prototype.onRemove = function (event) {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    };
    PostAnAdvertisementComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        console.log("in the posst add componrnet->" + this.Email);
    };
    PostAnAdvertisementComponent.prototype.onLogOut = function () {
        localStorage.clear();
        this.hidden2 = true;
        this.hidden1 = false;
        console.log("Local Storage Cleared");
        this.router.navigate(['']);
        console.log("Reloaded");
    };
    PostAnAdvertisementComponent.prototype.MessageWindow = function () {
        console.log("From post add");
        this.router.navigate(['Messages']);
    };
    PostAnAdvertisementComponent.prototype.PostAnAdd = function () {
        console.log(this.Email);
        this.router.navigate(['PostAnAdd']);
    };
    PostAnAdvertisementComponent.prototype.District = function (any) {
        this.latitude = any[0];
        this.longitude = any[1];
    };
    PostAnAdvertisementComponent.prototype.FuncBasic = function () {
        this.basichidden = false;
        this.abouthidden = true;
        this.prevhidden = true;
    };
    PostAnAdvertisementComponent.prototype.OnChoseLocation = function (event) {
        this.latitude = event.coords.lat;
        this.longitude = event.coords.lng;
        this.sharedService.setLatLong(event.coords.lat, event.coords.lng);
        this.BaseDetails.Latitude = this.latitude;
        this.BaseDetails.Longitude = this.longitude;
    };
    PostAnAdvertisementComponent.prototype.AboutItem = function () {
        this.basichidden = true;
        this.abouthidden = false;
        this.prevhidden = true;
    };
    PostAnAdvertisementComponent.prototype.PrevAdd = function () {
        var _this = this;
        this._http.get(this.ServerUrl + "/AddvImages").subscribe(function (data) {
            console.log(data);
        });
        this.basichidden = true;
        this.abouthidden = true;
        this.prevhidden = false;
        this.BaseDetails.Latitude = this.sharedService.getLat();
        this.BaseDetails.Longitude = this.sharedService.getLng();
        this.BaseDetails.ImageFilenames = this.imgFileNames;
        console.log(typeof (this.BaseDetails));
        this._http.post(this.ServerUrl + "/PostAdd", this.BaseDetails).subscribe(function (data) {
            console.log(data);
            _this.sharedService.setAddId(data["ID"]);
            _this.sharedService.setEmail(data["UserEmail"]);
            _this.images = data["IMUrl"];
            console.log(_this.images);
        }, function (error) {
            console.log(error);
        });
    };
    PostAnAdvertisementComponent.prototype.gotoHomepage = function () {
        this.router.navigate(['']);
    };
    PostAnAdvertisementComponent.prototype.OpenMap = function () {
        this._dialog.open(map_view_component_1.MapViewComponent);
    };
    __decorate([
        core_1.ViewChild('carousel', { static: true })
    ], PostAnAdvertisementComponent.prototype, "carousel");
    PostAnAdvertisementComponent = __decorate([
        core_1.Component({
            selector: 'app-post-an-advertisement',
            templateUrl: './post-an-advertisement.component.html',
            styleUrls: ['./post-an-advertisement.component.scss']
        })
    ], PostAnAdvertisementComponent);
    return PostAnAdvertisementComponent;
}());
exports.PostAnAdvertisementComponent = PostAnAdvertisementComponent;
