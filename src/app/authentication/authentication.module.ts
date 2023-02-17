import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { Page404Component } from "./page404/page404.component";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { SigninComponent } from "./signin/signin.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { SuperloginComponent } from "./superlogin/superlogin.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NgxCaptchaModule } from "ngx-captcha";
@NgModule({
  declarations: [
    Page404Component,
    SigninComponent,
    SuperloginComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    NgxCaptchaModule,
    MatCheckboxModule,
    PdfViewerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatMenuModule,
  ],
})
export class AuthenticationModule {}
