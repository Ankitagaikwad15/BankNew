import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ApiService } from "../shared/security/api.service";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { MatSelectChange } from "@angular/material/select";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatMenuTrigger } from "@angular/material/menu";
import { map, startWith } from "rxjs/operators";
import Swal from "sweetalert2";
import { AddBankComponent } from "../franchise-bank/add-bank/add-bank.component";
@Component({
  selector: "app-userclient",
  templateUrl: "./userclient.component.html",
  styleUrls: ["./userclient.component.scss"],
})
export class UserClientComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ViewOTPForm: FormGroup;
  @Input() EmailForm: FormGroup;
  @Input() ProductForm: FormGroup;
  @Input() createOrderOffline: FormGroup;
  myControl = new FormControl("");
  filteredOptions: Observable<string[]>;
  passcandidateid: any = {};
  displayedColumns = [
    "CandidateName","CandidateMobile" ,"CandidateEmail","action"
    ];
    displayAddUpdateModal="none";
  Pending = "Pending";
  ViewReport = "";
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  studentData: any = [];
  nameSearch: string = "";
  paymentdata: any;
  createOrder: any;
  leadProductList: any;
  personalInfo: any;
  ProductPrice: any;
  selectedFranchaiseId: any;
  fillOtpDocument = true;
  Noreport = "";
 
 
  studentList: any = [];
  operatorList: any = [];
  franchaiselogin = true;
  showMsg = false;
  dataSource: MatTableDataSource<any>;
  SuperUserId: string;
  StageId: string;
  candidatelist1: any;
  CandidateId: any;
 
  constructor(
    private formBuilder: FormBuilder,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
  selected = "-1";
  ngOnInit() {
    this.SuperUserId = localStorage.getItem("SuperUserId");
    this.StageId = localStorage.getItem("StageId");

      let param = {
        SuperUserId: parseInt(this.SuperUserId),
        StageId: parseInt(this.StageId),
      };
      this.api.getCandidate(param).subscribe((data) => {
        
        if (data["message_data"].length == 0) {
          this.showMsg = true;
        }
        this.candidatelist1 = data["message_data"][0];
        this.CandidateId = data["message_data"].CandidateId;
        this.dataSource = new MatTableDataSource(this.candidatelist1);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
    adduser(){
    const dialogRef = this.dialog.open(AddBankComponent, {
      position: {
        top: "20px",
      },
      width: "900px",
      height: "600px",

      data: {
        tabledata: "On test ",
        action: "addmode",
      },
      panelClass: "custom-dialog-container",
    });
    dialogRef.afterClosed().subscribe((data) => {
      this.ngOnInit();
    });

  }
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    closeAddUpdateModal(){
      this.displayAddUpdateModal="none";
    }
    editclient(){
      this.displayAddUpdateModal="block";
    }
  }