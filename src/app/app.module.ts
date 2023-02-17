import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { routing } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./layout/header/header.component";
import { PageLoaderComponent } from "./layout/page-loader/page-loader.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { RightSidebarComponent } from "./layout/right-sidebar/right-sidebar.component";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
import {
  LocationStrategy,
  HashLocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { DynamicScriptLoaderService } from "./shared/services/dynamic-script-loader.service";
import { ConfigService } from "./shared/services/config.service";
import { RightSidebarService } from "./shared/services/rightsidebar.service";
import { WINDOW_PROVIDERS } from "./shared/services/window.service";
import { CountdownModule } from "@ciri/ngx-countdown";
import { AuthService } from "./shared/security/auth.service";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { NgxMaskModule } from "ngx-mask";
import { MatListModule } from "@angular/material/list";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ClickOutsideModule } from "ng-click-outside";
import { HttpClientModule } from "@angular/common/http";
import { ApiService } from "./shared/security/api.service";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { MatTableModule } from "@angular/material/table";
import { FullCalendarModule } from "@fullcalendar/angular";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatCarouselModule } from "@ngmodule/material-carousel";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FlexLayoutModule } from "@angular/flex-layout";
import { GlobalEventsManagerService } from "./shared/security/globalEventsManager.service";
import { NgxCaptchaModule } from "ngx-captcha";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
  ],
  imports: [
    CountdownModule,
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    MatIconModule,
    NgxCaptchaModule,
    MatButtonModule,
    MatNativeDateModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonToggleModule,
    NgxSpinnerModule,
    ClickOutsideModule,
    NgxMaskModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FullCalendarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCarouselModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },

    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    DynamicScriptLoaderService,
    RightSidebarService,
    ConfigService,
    AuthService,
    ApiService,
    GlobalEventsManagerService,
    WINDOW_PROVIDERS,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
