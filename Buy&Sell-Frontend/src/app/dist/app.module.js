"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var ngx_device_detector_1 = require("ngx-device-detector");
var http_1 = require("@angular/common/http");
// Firebase libraries
var fire_1 = require("@angular/fire");
var firestore_1 = require("@angular/fire/firestore");
var storage_1 = require("@angular/fire/storage");
var firebaseConfig = {
    apiKey: "AIzaSyDEVNBEnyje6TpfhDrNrl4aOXOsKcIQ6kk",
    authDomain: "engineeringproject-30727.firebaseapp.com",
    databaseURL: "https://engineeringproject-30727.firebaseio.com",
    projectId: "engineeringproject-30727",
    storageBucket: "engineeringproject-30727.appspot.com",
    messagingSenderId: "274723328717",
    appId: "1:274723328717:web:6f8fcf0c3a938e530ecf84"
};
var app_routing_module_1 = require("./app-routing.module");
var toolbar_1 = require("@angular/material/toolbar");
var flex_layout_1 = require("@angular/flex-layout");
var icon_1 = require("@angular/material/icon");
var button_1 = require("@angular/material/button");
var sidenav_1 = require("@angular/material/sidenav");
var menu_1 = require("@angular/material/menu");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var slider_1 = require("@angular/material/slider");
var select_1 = require("@angular/material/select");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var navigation_bar_component_1 = require("./navigation-bar/navigation-bar.component");
var sign_or_login_component_1 = require("./sign-or-login/sign-or-login.component");
var home_component_1 = require("./home/home.component");
var shops_component_1 = require("./shops/shops.component");
var about_component_1 = require("./about/about.component");
var mobile_navigation_bar_component_1 = require("./mobile-navigation-bar/mobile-navigation-bar.component");
var verify_component_1 = require("./verify/verify.component");
var verify_login_component_1 = require("./verify-login/verify-login.component");
var login_error_dialog_box_component_1 = require("./login-error-dialog-box/login-error-dialog-box.component");
var angular_image_slider_1 = require("angular-image-slider");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var post_an_advertisement_component_1 = require("./post-an-advertisement/post-an-advertisement.component");
var core_2 = require("@agm/core");
var ngx_dropzone_1 = require("ngx-dropzone");
var add_preview_component_1 = require("./add-preview/add-preview.component");
var card_1 = require("@angular/material/card");
var angular_bootstrap_md_1 = require("angular-bootstrap-md");
var map_view_component_1 = require("./map-view/map-view.component");
var advertisement_grid_component_1 = require("./advertisement-grid/advertisement-grid.component");
var messages_component_1 = require("./messages/messages.component");
var sidebar_chats_component_1 = require("./sidebar-chats/sidebar-chats.component");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var chat_component_1 = require("./chat/chat.component");
var send_msg_from_add_component_1 = require("./send-msg-from-add/send-msg-from-add.component");
var event_emitter_service_1 = require("./event-emitter.service");
var mapforadd_component_1 = require("./mapforadd/mapforadd.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                navigation_bar_component_1.NavigationBarComponent,
                sign_or_login_component_1.SignOrLoginComponent,
                home_component_1.HomeComponent,
                shops_component_1.ShopsComponent,
                about_component_1.AboutComponent,
                mobile_navigation_bar_component_1.MobileNavigationBarComponent,
                verify_component_1.VerifyComponent,
                verify_login_component_1.VerifyLoginComponent,
                login_error_dialog_box_component_1.LoginErrorDialogBoxComponent,
                post_an_advertisement_component_1.PostAnAdvertisementComponent,
                add_preview_component_1.AddPreviewComponent,
                map_view_component_1.MapViewComponent,
                advertisement_grid_component_1.AdvertisementGridComponent,
                messages_component_1.MessagesComponent,
                sidebar_chats_component_1.SidebarChatsComponent,
                sidebar_component_1.SidebarComponent,
                chat_component_1.ChatComponent,
                send_msg_from_add_component_1.SendMsgFromAddComponent,
                mapforadd_component_1.MapforaddComponent
            ],
            entryComponents: [login_error_dialog_box_component_1.LoginErrorDialogBoxComponent, map_view_component_1.MapViewComponent, messages_component_1.MessagesComponent, advertisement_grid_component_1.AdvertisementGridComponent, send_msg_from_add_component_1.SendMsgFromAddComponent, mapforadd_component_1.MapforaddComponent],
            imports: [
                fire_1.AngularFireModule.initializeApp(firebaseConfig),
                firestore_1.AngularFirestoreModule,
                storage_1.AngularFireStorageModule,
                angular_bootstrap_md_1.MDBBootstrapModule.forRoot(),
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                toolbar_1.MatToolbarModule,
                sidenav_1.MatSidenavModule,
                slider_1.MatSliderModule,
                forms_1.FormsModule,
                card_1.MatCardModule,
                select_1.MatSelectModule,
                dialog_1.MatDialogModule,
                forms_2.ReactiveFormsModule,
                ngx_dropzone_1.NgxDropzoneModule,
                button_1.MatButtonModule,
                flex_layout_1.FlexLayoutModule,
                angular_image_slider_1.SliderModule,
                icon_1.MatIconModule,
                menu_1.MatMenuModule,
                ng_bootstrap_1.NgbModule,
                ngx_device_detector_1.DeviceDetectorModule.forRoot(),
                http_1.HttpClientModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyAUbRHtu3k_fg3jDGk_qAatE5jA4bC_ndE'
                })
            ],
            providers: [event_emitter_service_1.EventEmitterService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
