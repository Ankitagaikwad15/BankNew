import { FranchiseBankRoutingModule } from "./franchise-bank-routing.module";
import { FranchiseBankComponent } from "./franchise-bank.component";
import { NgModule } from "@angular/core";
// import {MaterialModule} from '@angular/material';
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatTableModule } from "@angular/material/table";
import { FullCalendarModule } from "@fullcalendar/angular";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { GaugeModule } from "angular-gauge";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { NgxEchartsModule } from "ngx-echarts";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {
  MatExpansionModule,
  MatExpansionPanel,
} from "@angular/material/expansion";

import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from "@angular/material/form-field";
import { OwlNativeDateTimeModule, OwlDateTimeModule } from "ng-pick-datetime";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { MatProgressButtonsModule } from "mat-progress-buttons";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgCircleProgressModule } from "ng-circle-progress";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddBankComponent } from "./add-bank/add-bank.component";
@NgModule({
  declarations: [FranchiseBankComponent, AddBankComponent],
  imports: [
    CommonModule,
    FranchiseBankRoutingModule,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    PerfectScrollbarModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
    MatToolbarModule,
    MaterialFileInputModule,
    NgxMaterialTimepickerModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSortModule,
    GaugeModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    MatProgressBarModule,
    MatExpansionModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    MatCheckboxModule,
    MatProgressButtonsModule,
    MatProgressButtonsModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
  ],
})
export class FranchiseBankModule {}
