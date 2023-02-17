import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransactionHistoryRoutingModule } from "./transaction-history-routing.module";
import { TransactionHistoryComponent } from "./transaction-history";
import { CountdownModule } from "ngx-countdown";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { GaugeModule } from "angular-gauge";
import { NgxEchartsModule } from "ngx-echarts";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTabsModule } from "@angular/material/tabs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NgCircleProgressModule } from "ng-circle-progress";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressButtonsModule } from "mat-progress-buttons";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { PdfViewerModule } from "ng2-pdf-viewer";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

import { OwlNativeDateTimeModule, OwlDateTimeModule } from "ng-pick-datetime";
@NgModule({
  declarations: [TransactionHistoryComponent],
  imports: [
    YouTubePlayerModule,
    CommonModule,
    TransactionHistoryRoutingModule,
    CountdownModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    PerfectScrollbarModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatDialogModule,
    NgApexchartsModule,
    NgxChartsModule,
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
    MatButtonToggleModule,
    MatProgressSpinnerModule,
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
export class TransactionHistoryModule {}
