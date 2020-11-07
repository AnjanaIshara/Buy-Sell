import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { HttpClientModule } from '@angular/common/http';


// Firebase libraries
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDEVNBEnyje6TpfhDrNrl4aOXOsKcIQ6kk",
    authDomain: "engineeringproject-30727.firebaseapp.com",
    databaseURL: "https://engineeringproject-30727.firebaseio.com",
    projectId: "engineeringproject-30727",
    storageBucket: "engineeringproject-30727.appspot.com",
    messagingSenderId: "274723328717",
    appId: "1:274723328717:web:6f8fcf0c3a938e530ecf84"
};


import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import{MatMenuModule} from'@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

import { SignOrLoginComponent } from './sign-or-login/sign-or-login.component';
import { HomeComponent } from './home/home.component';
import { ShopsComponent } from './shops/shops.component';
import { AboutComponent } from './about/about.component';
import { MobileNavigationBarComponent } from './mobile-navigation-bar/mobile-navigation-bar.component';
import { VerifyComponent } from './verify/verify.component';
import { VerifyLoginComponent } from './verify-login/verify-login.component';
import { LoginErrorDialogBoxComponent } from './login-error-dialog-box/login-error-dialog-box.component';
import { SliderModule } from 'angular-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostAnAdvertisementComponent } from './post-an-advertisement/post-an-advertisement.component';
import{AgmCoreModule} from'@agm/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddPreviewComponent } from './add-preview/add-preview.component';
import {MatCardModule} from '@angular/material/card';
import{MDBBootstrapModule} from 'angular-bootstrap-md';
import { MapViewComponent } from './map-view/map-view.component';
import { AdvertisementGridComponent } from './advertisement-grid/advertisement-grid.component';
import { MessagesComponent } from './messages/messages.component';
import { SidebarChatsComponent } from './sidebar-chats/sidebar-chats.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatComponent } from './chat/chat.component';
import { SendMsgFromAddComponent } from './send-msg-from-add/send-msg-from-add.component';
import { EventEmitterService } from './event-emitter.service';
import { MapforaddComponent } from './mapforadd/mapforadd.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SignOrLoginComponent,
    HomeComponent,
    ShopsComponent,
    AboutComponent,
    MobileNavigationBarComponent,
    VerifyComponent,
    VerifyLoginComponent,
    LoginErrorDialogBoxComponent,
    PostAnAdvertisementComponent,
    AddPreviewComponent,
    MapViewComponent,
    AdvertisementGridComponent,
    MessagesComponent,
    SidebarChatsComponent,
    SidebarComponent,
    ChatComponent,
    SendMsgFromAddComponent,
    MapforaddComponent
   
   
    
  ],
  entryComponents: [LoginErrorDialogBoxComponent,MapViewComponent,MessagesComponent,AdvertisementGridComponent,SendMsgFromAddComponent,MapforaddComponent],
  imports: [

    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    
    AngularFireStorageModule, // storage
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSliderModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    MatButtonModule,
    FlexLayoutModule,
    SliderModule,
    MatIconModule,
    MatMenuModule,
    NgbModule,
    DeviceDetectorModule.forRoot(),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAUbRHtu3k_fg3jDGk_qAatE5jA4bC_ndE'
    })


  ],
  
  providers: [EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
