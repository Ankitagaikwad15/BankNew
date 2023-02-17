import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {
  Component,
  Output,
  Inject,
  Input,
  EventEmitter,
  OnInit,
} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { formatDate } from "@angular/common";
import { ApiService } from "src/app/shared/security/api.service";
import { MatSelectChange } from "@angular/material/select";
import { GlobalEventsManagerService } from "src/app/shared/security/globalEventsManager.service";
import * as moment from "moment";
export interface onAddStudent {
  student: any;
  action: string;
}
@Component({
  selector: "app-add-update-student",
  templateUrl: "./add-update-student.component.html",
  styleUrls: ["./add-update-student.component.sass"],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "en-GB" }],
})
export class AddUpdateStudentComponent implements OnInit {
  
  selectedImageName: any;
  candId: any;
  ProfileImageName: string;
  CandidateLastName: any;
  CandidateFirstName: any;
  CandidateMiddleName: any;genders = [
    { id: 1, value: "Male" },
    { id: 2, value: "Female" },
    { id: 0, value: "Other" },
  ];
  selectedGender = "1";
  userDateOfBirth: Date;
  returnGenderValue: any;
  c_email: string;
  CandidateId: string;
  personalForm: FormGroup;
  c_phone: any;
  normalUserCandID: number;
  constructor(private api: ApiService, private fb: FormBuilder,private snackbar: MatSnackBar,
    private globalEventsManagerService: GlobalEventsManagerService,) {}
  ngOnInit(): void {
    if (localStorage.getItem("candID")) {
      this.CandidateId = localStorage.getItem("candID");
    }

    this.personalForm = this.fb.group({
      CandidateFirstName: ["", Validators.required],
      CandidateMiddleName: [""],
      CandidateLastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      dateOfBirth: [""],
      phone: ["", Validators.compose([Validators.pattern("[0-9]{10}")])],
      gender: [""],
    });


    this.loadPersonalData();
  }
  selectGender(event: MatSelectChange) {
    this.selectedGender = event.source.value;
  }
  loadPersonalData() {
    this.api.getPersonalInfo(this.CandidateId).subscribe((data) => {
      if (data["message_code"] == 1000) {
        if (data["message_data"].length !== 0) {
          this.CandidateFirstName = data["message_data"][0].CandidateFirstName;
          this.CandidateLastName = data["message_data"][0].CandidateLastName;
          this.CandidateMiddleName =
            data["message_data"][0].CandidateMiddleName;
          this.c_email = data["message_data"][0].CandidateEmail;
          this.c_phone = data["message_data"][0].CandidateMobile;
          this.candId = data["message_data"][0].CandidateId;
          this.returnGenderValue = data["message_data"][0].CandidateGender;
          if (
            data["message_data"][0].CandiadateDateOfBirth != undefined &&
            data["message_data"][0].CandiadateDateOfBirth != null &&
            data["message_data"][0].CandiadateDateOfBirth != ""
          ) {
            this.userDateOfBirth = new Date(
              data["message_data"][0].CandiadateDateOfBirth
            );
          }
          if (
            data["message_data"][0].CandidateProfileImageName != undefined &&
            data["message_data"][0].CandidateProfileImageName != null &&
            data["message_data"][0].CandidateProfileImageName != ""
          ) {
          } else {
          }
        } else {
        }
      }
    });
  }
  personalInfo() {
    if (this.personalForm.invalid) {
    } else {
      let date_DOB = moment(
        new Date(this.personalForm.value.dateOfBirth)
      ).format("DD/MM/YYYY");
      if (this.selectedImageName) {
        var profileImg = this.selectedImageName;
      } else {
        profileImg = "";
      }
      let param = {
        CandidateFirstName: this.personalForm.value.CandidateFirstName,
        CandidateMiddleName: this.personalForm.value.CandidateMiddleName,
        CandidateLastName: this.personalForm.value.CandidateLastName,
        CandidateEmail: this.personalForm.value.email,
        CandidateMobile: this.personalForm.value.phone,
        CandiadateDateOfBirth: date_DOB,
        CandidateGender: parseInt(this.selectedGender),
        LastmodifiedBy: this.CandidateId,
      };
      var UserCandId = localStorage.getItem("candID");
      this.normalUserCandID = parseInt(UserCandId);
      this.api
        .updatePersonalInfo(this.normalUserCandID, param)
        .subscribe((data) => {
          if (data["message_code"] == 1000) {
            this.globalEventsManagerService.showNavBar.emit(true);
            this.snackbar.open(data["message_text"], "X", {
              duration: 3000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
              panelClass: "snackbar-success",
            });
          } else {
            this.snackbar.open(data["message_text"], "X", {
              duration: 3000,
              verticalPosition: "bottom",
              horizontalPosition: "center",
              panelClass: "snackbar-denger",
            });
          }
        });
    }
  }
}
