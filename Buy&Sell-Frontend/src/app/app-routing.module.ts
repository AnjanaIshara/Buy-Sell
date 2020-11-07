import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { SignOrLoginComponent } from './sign-or-login/sign-or-login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ShopsComponent } from './shops/shops.component';

import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { VerifyComponent } from './verify/verify.component';
import { MobileNavigationBarComponent } from './mobile-navigation-bar/mobile-navigation-bar.component';
import{VerifyLoginComponent} from './verify-login/verify-login.component';
import{PostAnAdvertisementComponent} from './post-an-advertisement/post-an-advertisement.component'
import {MessagesComponent} from './messages/messages.component';
var DesktopRoutes: Routes = [
  {
    path: '', component: NavigationBarComponent
  },
  {
    path: 'SignupLogin', component: SignOrLoginComponent

  },
  {
    path: 'Home', component: HomeComponent
  },
  {
    path: 'About', component: AboutComponent

  },
  {
    path: 'Shops', component: ShopsComponent
  },
  {
    path: 'Verify', component: VerifyComponent
  },
  {
    path: 'VerifyLogin', component: VerifyLoginComponent
  },
  {
    path:'LoggingOut',component:MobileNavigationBarComponent
  },
  {
    path:'PostAnAdd',component:PostAnAdvertisementComponent
  },
  {
    path:'Messages',component:MessagesComponent
  }
];



@NgModule({
  
  imports: [RouterModule.forRoot(DesktopRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
