import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ApiService } from "../shared/security/api.service";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Input } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import Swal from "sweetalert2";
import { AddBankComponent } from "./add-bank/add-bank.component";
@Component({
  selector: "app-franchise-bank",
  templateUrl: "./franchise-bank.component.html",
  styleUrls: ["./franchise-bank.component.scss"],
})
export class FranchiseBankComponent implements OnInit {
  @Input() franchiseForm: FormGroup;
  @Input() myGroup: FormGroup;
  editFollowup: any = {};
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("searchFilter", { static: true }) searchFilter: ElementRef;
  displaybankModel = "none";
  createlink = false;
  leadsList: any = [];
  editbank: any = {};
  table: any;
  rollid: any;
  isLoading = false;
  selectedValue: any;
  mode: string;

  displayedColumns = [
    "serialNo",
    "BankAccountName",
    "BankAccountNo",
    "IFSC_Code",
    "Bank_Status",
    "CreatedOn",
    "actions",
  ];
  showMsg = false;
  FranchiseDepartment1: any;
  processedEvents: any;
  objAppId: any;
  objAppCode: any;
  objAppQRCodeImage: any;
  objAppShortURL: any;
  singleLeadDetail: any = [];
  Bankdetails: any;
  singlefranchies: any;
  FranchiseId: number;
  FranchiseOrganisationName: any;
  OwnerName: any;
  FranchiseIdEmail: any;
  FranchiseContactNo: any;

  constructor(
    private route: ActivatedRoute,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private _snackBar: MatSnackBar, 
  ) {}
  dataSource: MatTableDataSource<any>;
  rows = [];
  operatorList: any = [];
  ngOnInit() {
   
    this.FranchiseId = 53||parseInt(this.route.snapshot.queryParams.FranchiseId);
    var candID = localStorage.getItem("SuperUserId");
    this.getFranchiseList();
  }
 
  getFranchiseList() {
    this.isLoading = true;
    this.api.bankbyfranchaiseId().subscribe(
      (data) => {
        this.processedEvents = data;

       
        return this.processedEvents.map((obj) => {
          this.dataSource = new MatTableDataSource(this.processedEvents);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        });
      },
      (error) => {
        if (error.error.message_code == "999") {
          this.isLoading = false;
          this.showMsg = true;
          Swal.fire({
            icon: "error",
            title: "Please Check!",
            text: `${error.error.message_text}`,
            footer: "",
          });
        }
      }
    );
  }
  addBank() {
    this.mode = "ADD BANK";
    this.editbank.mode = "addMode";
    this.displaybankModel = "block";
  }
  editBank(obj) {
    // this.mode = "EDIT BANK";
    // this.editbank = obj;
    // this.editbank.mode = "editMode";
    // this.displaybankModel = "block";
    const dialogRef = this.dialog.open(AddBankComponent, {
      position: {
        top: "20px",
      },
      width: "900px",
      height: "600px",

      data: {
        editbank: obj,
        action: "editMode",
      },
      panelClass: "custom-dialog-container",
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.ngOnInit();
    });
  }
  closebankModel() {
    this.displaybankModel = "none";
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
