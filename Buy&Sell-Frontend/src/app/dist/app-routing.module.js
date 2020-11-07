"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var sign_or_login_component_1 = require("./sign-or-login/sign-or-login.component");
var home_component_1 = require("./home/home.component");
var about_component_1 = require("./about/about.component");
var shops_component_1 = require("./shops/shops.component");
var navigation_bar_component_1 = require("./navigation-bar/navigation-bar.component");
var verify_component_1 = require("./verify/verify.component");
var mobile_navigation_bar_component_1 = require("./mobile-navigation-bar/mobile-navigation-bar.component");
var verify_login_component_1 = require("./verify-login/verify-login.component");
var post_an_advertisement_component_1 = require("./post-an-advertisement/post-an-advertisement.component");
var messages_component_1 = require("./messages/messages.component");
var DesktopRoutes = [
    {
        path: '', component: navigation_bar_component_1.NavigationBarComponent
    },
    {
        path: 'SignupLogin', component: sign_or_login_component_1.SignOrLoginComponent
    },
    {
        path: 'Home', component: home_component_1.HomeComponent
    },
    {
        path: 'About', component: about_component_1.AboutComponent
    },
    {
        path: 'Shops', component: shops_component_1.ShopsComponent
    },
    {
        path: 'Verify', component: verify_component_1.VerifyComponent
    },
    {
        path: 'VerifyLogin', component: verify_login_component_1.VerifyLoginComponent
    },
    {
        path: 'LoggingOut', component: mobile_navigation_bar_component_1.MobileNavigationBarComponent
    },
    {
        path: 'PostAnAdd', component: post_an_advertisement_component_1.PostAnAdvertisementComponent
    },
    {
        path: 'Messages', component: messages_component_1.MessagesComponent
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(DesktopRoutes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
