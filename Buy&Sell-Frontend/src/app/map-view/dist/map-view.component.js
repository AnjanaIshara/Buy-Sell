"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MapViewComponent = void 0;
var core_1 = require("@angular/core");
var MapViewComponent = /** @class */ (function () {
    function MapViewComponent(_sharedservice) {
        this._sharedservice = _sharedservice;
        this.latitude = 6.9271;
        this.longitude = 79.8612;
        this.latitude = _sharedservice.getLatlng()[0];
        this.longitude = _sharedservice.getLatlng()[1];
    }
    MapViewComponent.prototype.ngOnInit = function () {
    };
    MapViewComponent = __decorate([
        core_1.Component({
            selector: 'app-map-view',
            templateUrl: './map-view.component.html',
            styleUrls: ['./map-view.component.css']
        })
    ], MapViewComponent);
    return MapViewComponent;
}());
exports.MapViewComponent = MapViewComponent;
