"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedService = void 0;
var core_1 = require("@angular/core");
var SharedService = /** @class */ (function () {
    function SharedService() {
        this.MobileNumber = {};
        this.TypeOfLogin = '';
        this.Email = '';
        this.status = false;
        this.AddID = '';
        this.arrLatLong = [];
        this.AddvetisementRecipient = "";
        //this.ServerUrl='http://ec2-18-222-97-152.us-east-2.compute.amazonaws.com:8080';
        this.ServerUrl = 'http://localhost:8080';
    }
    SharedService.prototype.setMobileNumber = function (val) {
        this.MobileNumber = val;
    };
    SharedService.prototype.setType = function (val) {
        this.TypeOfLogin = val;
    };
    SharedService.prototype.setStatus = function (val) {
        this.status = val;
    };
    SharedService.prototype.setEmail = function (val) {
        this.Email = val;
    };
    SharedService.prototype.setAddId = function (val) {
        this.AddID = val;
    };
    SharedService.prototype.setLatLong = function (lat, lng) {
        this.arrLatLong = [lat, lng];
    };
    SharedService.prototype.setDialgIndex = function (val) {
        this.AddDialogIndex = val;
    };
    SharedService.prototype.setAddvetisementRecipient = function (val) {
        this.AddvetisementRecipient = val;
    };
    SharedService.prototype.setLoadChatOf = function (val) {
        this.LoadChatOf = val;
    };
    SharedService.prototype.getLoadChatOf = function () {
        return this.LoadChatOf;
    };
    SharedService.prototype.getAddvetisementRecipient = function () {
        return this.AddvetisementRecipient;
    };
    SharedService.prototype.getDialogIndex = function () {
        return this.AddDialogIndex;
    };
    SharedService.prototype.getMobileNumber = function () {
        return this.MobileNumber;
    };
    SharedService.prototype.getType = function () {
        return this.TypeOfLogin;
    };
    SharedService.prototype.getEmail = function () {
        return this.Email;
    };
    SharedService.prototype.getServer = function () {
        return this.ServerUrl;
    };
    SharedService.prototype.getStatus = function () {
        return this.status;
    };
    SharedService.prototype.getAddId = function () {
        return this.AddID;
    };
    SharedService.prototype.getLatlng = function () {
        return this.arrLatLong;
    };
    SharedService.prototype.getLat = function () {
        return this.arrLatLong[0];
    };
    SharedService.prototype.getLng = function () {
        return this.arrLatLong[1];
    };
    SharedService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SharedService);
    return SharedService;
}());
exports.SharedService = SharedService;
