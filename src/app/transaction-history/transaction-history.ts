import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DomSanitizer } from "@angular/platform-browser";
import { MatPaginator } from "@angular/material/paginator";
import {
  FormBuilder,
} from "@angular/forms";
import {  ElementRef, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ApiService } from "../shared/security/api.service";
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: "app-transaction-history",
  templateUrl: "./transaction-history.component.html",
  styleUrls: ["./transaction-history.component.scss"],
})
export class TransactionHistoryComponent implements OnInit {
  
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchFilter", { static: true }) searchFilter: ElementRef;
  displayedColumns = [
    "ondatee",
    "ammount",
    "toperson",
    
  ];
  
  processedEvents: any;
 constructor(
    private api: ApiService,
    public snackBar: MatSnackBar,
  ) {}
ngOnInit(): void {
  this.api.transactionhistory().subscribe((data)=>{
this.processedEvents=data;
console.warn(data[0]);
    this.dataSource = new MatTableDataSource(this.processedEvents);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
}
}