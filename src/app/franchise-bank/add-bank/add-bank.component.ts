import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { formatDate } from "@angular/common";
import { ApiService } from "src/app/shared/security/api.service";
import { EventEmitter, Input, Output, Component, OnInit, Inject } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
export interface onAddFollowUp {
  folloup: any;
  action: string;
}
export interface onUpdateFollowUp {
  folloup: any;
  action: string;
}
@Component({
  selector: "app-add-bank",
  templateUrl: "./add-bank.component.html",
  styleUrls: ["./add-bank.component.sass"],
})
export class AddBankComponent implements OnInit {
  @Input() addbankform: FormGroup;
  @Input() editbank: any = {};
  @Input() editFollowup: any = {};
  @Input() leadAddSideFilter: any = {};
  @Output() public addFollowUp: EventEmitter<onAddFollowUp> =
    new EventEmitter();
  @Output()
  public updateFollowUp: EventEmitter<onUpdateFollowUp> = new EventEmitter();
  dialogTitle: string;
  displayAppDetailsModal = "none";
  displayIFSCdetails = "none";
  tempObj = {
    BankStatus: "",
    BankAccountName: "",
    BankAccountNo: "",
    IFSC_Code: "",
  };
  IFSC_Code = 0;
  candidateId: number;
  bankstatus: any;
  SelectedBankStatus: number;
  FranchiseId: any;
  IFSCdata: any;
  BANK: any;
  BRANCH: any;
  CITY: any;
  STATE: any;
  ADDRESS: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    
    public dialogRef: MatDialogRef<AddBankComponent>,
    private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any
  
  ) {}
  ngOnInit() {
    var candID = localStorage.getItem("SuperUserId");

    this.FranchiseId = parseInt(this.route.snapshot.queryParams.FranchiseId);
    this.candidateId = parseInt(candID);
    this.addFormDetails();
    this.getPreeCallOutComeList();
    if(this.data.action=="addMode"){
      this.editbank.mode = "addMode"
      this.dialogTitle="Add Bank";
     
    }
    if (this.data.action == "editMode") {
      this.dialogTitle="Edit Bank";
      this.tempObj.BankStatus = this.editbank.Bank_Status;
      this.tempObj.BankAccountName = this.editbank.BankAccountName;
      this.tempObj.BankAccountNo = this.editbank.BankAccountNo;
      this.tempObj.IFSC_Code = this.editbank.IFSC_Code;
    } else {
      this.data.action = "addMode";
    }
    this.SelectedBankStatus = 1;
  }
  addFormDetails() {
    this.addbankform = this.fb.group({
      BankAccountName: new FormControl("", Validators.required),
      BankAccountNo: new FormControl("", Validators.required),
      IFSC_Code: new FormControl("", Validators.required),
      Bank_Status: new FormControl(""),
    });
  }
  getPreeCallOutComeList() {
    var param = {
      CodeType: "Bank_Status",
    };
    this.api.getListForCodeType(param).subscribe((data) => {
      this.bankstatus = data["message_data"];
    });
  }
  verifyIFSC() {
    let param = {
      IFSC_Code: this.addbankform.value.IFSC_Code || this.editbank.IFSC_Code,
    };
    this.api.verifyIFSC(param).subscribe(
      (data) => {
        this.IFSCdata = data["message_data"];
        this.BANK = data["message_data"].BANK;
        this.BRANCH = data["message_data"].BRANCH;
        this.CITY = data["message_data"].CITY;
        this.STATE = data["message_data"].STATE;
        this.ADDRESS = data["message_data"].ADDRESS;
        this.displayIFSCdetails = "block";
        this.IFSC_Code = 1;
      },
      (error) => {
        if (error.error.message_code == "999") {
          Swal.fire({
            icon: "error",
            title: "Please Check!",
            text: `Invalid IFSC Code ( Please Enter Valid IFSC_Code )`,
            footer: "",
          });
        }
      }
    );
  }
  HideIFSCdetails() {
    this.displayIFSCdetails = "none";
    Swal.fire("Verified!", "IFSC Code Verified SuccessFully...", "success");
  }
  onSubmit() {
    if (this.addbankform.invalid) {
      return;
    } else {
      if (this.data.action == "editMode" && this.IFSC_Code == 1) {
        let param = {
          BankDetailsId: this.editbank.BankDetailsId,
          BankAccountName:
            this.addbankform.value.BankAccountName ||
            this.editbank.BankAccountName,
          BankAccountNo:
            this.addbankform.value.BankAccountNo || this.editbank.BankAccountNo,
          IFSC_Code:
            this.addbankform.value.IFSC_Code || this.editbank.IFSC_Code,
          Bank_Status: this.SelectedBankStatus || this.editbank.Bank_Status,
        };
        this.api.editbankdetails(param).subscribe(
          (data) => {
            Swal.fire(
              "Thank You!",
              "Bank Details Updated SuccessFully...",
              "success"
            ).then((response) => {
              this.onNoClick();
            });
            this.IFSC_Code = 1;
          },
          (error) => {
            if (error.error.message_code == "999") {
              Swal.fire({
                icon: "error",
                title: "Please Check!",
                text: `${error.error.message_text}`,
                footer: "",
              });
            }
          }
        );
      } else if (this.data.action == "addMode" && this.IFSC_Code == 1) {
        let param = {
          FranchiseId: this.FranchiseId,
          BankAccountName: this.addbankform.value.BankAccountName,
          BankAccountNo: this.addbankform.value.BankAccountNo,
          IFSC_Code: this.addbankform.value.IFSC_Code,
          Bank_Status: this.SelectedBankStatus,
          UploadedBy: this.FranchiseId,
          CreatedBy: this.FranchiseId,
          LastModifiedBy: this.FranchiseId,
        };
        this.api.addbank(param).subscribe(
          (data) => {
            Swal.fire(
              "Thank You!",
              "Bank Details Added SuccessFully...",
              "success"
            ).then((response) => {
              this.onNoClick();
            });
            this.IFSC_Code = 1;
          },
          (error) => {
            if (error.error.message_code == "999") {
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
    }
  }
  onNoClick() {
   
      this.dialogRef.close();
    
    this.addFollowUp.emit({ folloup: null, action: "cancel" });
  }

  selectedPredefinedValue(event: MatSelectChange) {
    this.SelectedBankStatus = parseInt(event.source.value);
  }
}
