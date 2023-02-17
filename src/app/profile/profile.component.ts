import { filter } from "rxjs/operators";
import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  EventEmitter,
  ElementRef,
  ChangeDetectorRef,
  Output,
} from "@angular/core";
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ApiService } from "../shared/security/api.service";
import * as moment from "moment";
import { ClickType } from "@swimlane/ngx-datatable";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { element } from "protractor";
import { constrainMarkerToRange } from "@fullcalendar/core/datelib/date-range";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { GlobalEventsManagerService } from "../shared/security/globalEventsManager.service";
import { MatSelectChange } from "@angular/material/select";

export interface geographicElement {
  type: any;
  country: string;
  state: string;
  city: string;
  address1: any;
  address2: any;
  pincode: string;
}

export interface instituteElement {
  inst_name: string;
  inst_address: string;
  city: string;
  state: string;
  pincode: string;
  course: string;
  date_join: any;
  date_end: any;
}
export interface OnChangeProfileImage {
  image: any;
  action: string; //update
}
export interface parentElement {
  name: string;
  email: string;
  ocupation: string;
  relation: string;
  gender: string;
  mobile: string;
}

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  @Output() public formDataEvent = new EventEmitter<any>();
  @Output() public NewEvent = new EventEmitter<any>();
  personalForm: FormGroup;
  @Output() public onChangeImage: EventEmitter<OnChangeProfileImage> =
    new EventEmitter();
  @ViewChild("paginator", { read: MatPaginator }) paginator: MatPaginator;
  @ViewChild("paginatorOne", { read: MatPaginator }) paginatorOne: MatPaginator;
  @ViewChild("paginatorTwo", { read: MatPaginator }) paginatorTwo: MatPaginator;
  demog_DataSource: Observable<any>;
  inst_DataSource: Observable<any>;
  parent_DataSource: Observable<any>;

  dataSource: MatTableDataSource<any>;
  dataSourceOne: MatTableDataSource<any>;
  dataSourceTwo: MatTableDataSource<any>;
  demog_dataSource: any;
  studentroll = "this is student roll";
  filteredStates: any = [];
  male = "Male";
  female = "Female";
  filteredCities: any;
  cityInfo: any = [];
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  stateInfo: any = []; changePassForm: FormGroup;
  c_name: string;
  emailotpdisplay = false;
  c_email: string;
  openProfilePhotos = "none";
 

  //parent variables//
  occuptn: any;
  p_name: any;
  mobile_no: any;
  parent_email: any;
  relationship: any;

  addressType: any;
  pincode: any;
  course: any;
  file: string;
  //--
  date_join = new FormControl(new Date());
  date_end = new FormControl(new Date());

  data = [];
  filteredData = [];


  genders = [
    { id: 1, value: "Male" },
    { id: 2, value: "Female" },
    { id: 0, value: "Other" },
  ];
  CandidateId: any;

  isLoading = false;
  candId: any;
  ProfileImageName: string;
  CandidateLastName: any;
  CandidateFirstName: any;
  CandidateMiddleName: any;
  selectedGender = "1";
  userDateOfBirth: Date;
  returnGenderValue: any;
  selectedImageName: any;
  normalUserCandID: number;
  c_phone: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private globalEventsManagerService: GlobalEventsManagerService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {

  }

  ngOnInit(): void {
    if (localStorage.getItem("candID")) {
      this.CandidateId = localStorage.getItem("candID");
    }

    this.personalForm = this.formBuilder.group({
      CandidateFirstName: ["", Validators.required],
      CandidateMiddleName: [""],
      CandidateLastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      dateOfBirth: [""],
      phone: ["", Validators.compose([Validators.pattern("[0-9]{10}")])],
      gender: [""],
    });


    this.changePasswordForm()
    this.loadPersonalData();
  }
  changePasswordForm() {
    this.changePassForm = this.formBuilder.group({
      CandidateEmail: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
      CandidatePassword: new FormControl("", Validators.required),
      newPassword: new FormControl("", Validators.required),
    });
  }


  sendFormData() {
    this.formDataEvent.emit(this.personalForm);
  }
  NewEventt() {
    this.NewEvent.emit(this.studentroll);
  }




  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  interestCtrl = new FormControl();
  filteredInterest: Observable<any[]>;
  Interest: any[] = [];
  allInterest: string[] = [];

  @ViewChild("interestInput") interestInput: ElementRef<HTMLInputElement>; //changes
  @ViewChild("auto") matAutocomplete: MatAutocomplete;





  private _filter(value: any): any[] {
    const filterValue = value;

    if (isNaN(filterValue)) {
      return this.allInterest.filter(
        (interest) =>
          interest["InterestTopicName"].toLowerCase().indexOf(filterValue) === 0
      );
    } else {
      return this.allInterest;
      // return this.allInterest.filter(interest => interest['InterestTopicId'].indexOf(filterValue) === 0);
    }
  }

  selectGender(event: MatSelectChange) {
    this.selectedGender = event.source.value;
  }

  changePasswordInfo() {
    var changePwd = this.changePassForm.value;
    if (this.changePassForm.invalid) {
    } else {
      var param = {
        CandidateEmail: this.changePassForm.value.CandidateEmail,
        CandidatePassword: this.changePassForm.value.CandidatePassword,
        newPassword: this.changePassForm.value.newPassword,
      };
      this.api.candidateUpdatePwd(param).subscribe(
        (data) => {
          if (data["message_code"] == 1000) {
            this.changePassForm.reset();
            Swal.fire("Thank You!", `${data["message_text"]}`, "success");
          }
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
