import { HttpClient } from "@angular/common/http";
import { Component, ElementRef,Input, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { ApiService } from "../shared/security/api.service";
declare let Razorpay: any;
@Component({
  selector: "app-transaction-money",
  templateUrl: "./transaction-money.component.html",
  styleUrls: ["./transaction-money.component.scss"],
})
export class TransactionMoneyComponent implements OnInit {
  candidatelist1: any;
  candid: string;
  @Input() transferammountform: FormGroup;
  constructor(
    private api: ApiService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
   this.candid= localStorage.getItem("candID");
this.addDetails();
    let param = {
      SuperUserId: 23,
      StageId: 21,
    };
    this.api.getCandidate(param).subscribe((data) => {
    
      this.candidatelist1 = data["message_data"][0];
     
    });
  }
  addDetails() {
    this.transferammountform = this.fb.group({
      Ammount: new FormControl("", Validators.required),
      TransferTo: new FormControl("", Validators.required),
    });
  }
  onSubmit(){

let param={
  TransferFrom:this.candid,
  TransferTo:this.transferammountform.value.TransferTo,
  Ammount:this.transferammountform.value.Ammount,
}
this.api.transferammount(param).subscribe((data)=>{
  if(data){
    this.snackbar.open("Transaction Sucessfully Done", "X", {
      duration: 3000,
      verticalPosition: "bottom",
      horizontalPosition: "center",
      panelClass: "snackbar-success",
    });
  }
})
  }
}