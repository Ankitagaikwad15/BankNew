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
import { debug } from "console";

export interface geographicElement {
  type: any;
  country: string;
  state: string;
  city: string;
  address1: any;
  address2: any;
  pincode: any;
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
  selector: "app-super-profile",
  templateUrl: "./super-profile.component.html",
  styleUrls: ["./super-profile.component.scss"],
})
export class SuperProfileComponent implements OnInit {
  @Output() public onChangeImage: EventEmitter<OnChangeProfileImage> =
    new EventEmitter();
  @ViewChild("paginator", { read: MatPaginator }) paginator: MatPaginator;
  @ViewChild("paginatorOne", { read: MatPaginator }) paginatorOne: MatPaginator;
  @ViewChild("paginatorTwo", { read: MatPaginator }) paginatorTwo: MatPaginator;
  @ViewChild("interestInput") interestInput: ElementRef<HTMLInputElement>; //changes
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  demog_DataSource: Observable<any>;
  inst_DataSource: Observable<any>;
  parent_DataSource: Observable<any>;

  dataSource: MatTableDataSource<any>;
  dataSourceOne: MatTableDataSource<any>;
  dataSourceTwo: MatTableDataSource<any>;
  demog_dataSource: any;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  interestCtrl = new FormControl();
  filteredInterest: Observable<any[]>;
  Interest: any[] = [];
  allInterest: string[] = [];
  profileImg =
    "https://dheya-apps-data.s3.ap-southeast-1.amazonaws.com/user-profile-pics/";
  mentorImgPath = "https://www.dheya.net/PortalContents/Images/avatar-img.png";
  //--for custom table--//
  displayedColumns: string[] = [
    "type",
    "country",
    "state",
    "city",
    "address1",
    "address2",
    "pincode",
    "actions",
  ];
  instituteColumns: string[] = [
    "inst_name",
    "inst_address",
    "city",
    "state",
    "pincode",
    "course",
    "date_join",
    "date_end",
    "actions",
  ];
  parentColumns: string[] = [
    "name",
    "email",
    "relation",
    "gender",
    "mobile",
    "actions",
  ];

  allCountries: any = [];
  allStates: any = [];
  allCities: any = [];
  filteredStates: any = [];
  filteredCities: any;
  cityInfo: any = [];
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  stateInfo: any = [];
  //--forms--//
  demographicDetails: any = [];
  personalForm: FormGroup;
  
  changePassForm: FormGroup;
  // submitted = false;
  c_name: string;
  c_email: string;
  openProfilePhotos = "none";
  c_phone: string;

  p_gender: any;

  inst_name: string;
  inst_address: string;
  inst_city: string;

  //parent variables//
  occuptn: any;
  p_name: any;
  mobile_no: any;
  parent_email: any;
  relationship: any;

  editForm: FormGroup;
  register: FormGroup;
  selectedOption: string;
  genders = [
    { id: 1, value: "Male" },
    { id: 2, value: "Female" },
    { id: 0, value: "Other" },
  ];
  SuperUserId: any;
  normalUserCandID: any;
  isLoading = false;
  CandidateProfileImageName: any;
  candId: any;
  selectedImageName: any;
  candidateProfile: string;
  ProfileImageName: string;
  CandidateLastName: any;
  CandidateFirstName: any;
  CandidateMiddleName: any;

  userDateOfBirth: Date;
  selectedGender: string;
  returnGenderValue: any;
  FranchiseId: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private globalEventsManagerService: GlobalEventsManagerService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("SuperUserId")) {
      this.SuperUserId = localStorage.getItem("SuperUserId");
    }
    this.changePasswordForm();
   this.getSuperUserDetailById();
    //personal information tab//
    this.personalForm = this.formBuilder.group({
      CandidateFirstName: ["", Validators.required],
      // CandidateMiddleName: ["", Validators.required],
      gender: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      dateOfBirth: [""],
      phone: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9]{10}"),
        ]),
      ],
    });
  }
  changePasswordForm() {
    this.changePassForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
      Password: new FormControl("", Validators.required),
      newPassword: new FormControl("", Validators.required),
    });
  }
 
 

  personalInfo() {
    if (this.personalForm.invalid) {
    } else {
      let date_DOB = moment(
        new Date(this.personalForm.value.dateOfBirth)
      ).format("MM/DD/YYYY");
      let param = {
        SuperUserName: this.personalForm.value.CandidateFirstName,
        Email: this.personalForm.value.email,
        Mobile: this.personalForm.value.phone,
        DateOfBirth: date_DOB,
        Gender: parseInt(this.selectedGender),
        SuperUserId: parseInt(this.SuperUserId),
        LastmodifiedBy: parseInt(this.SuperUserId),
      };
      this.api.updateSuperUser(param).subscribe((data) => {
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

 
  getSuperUserDetailById() {
    this.api.getSuperUserDetails().subscribe((data) => {
      if (data["message_code"] == 1000) {
        if (data["message_data"].length !== 0) {
          this.CandidateFirstName = data["message_data"][0].SuperUserName;
          this.c_email = data["message_data"][0].Email;
          this.c_phone = data["message_data"][0].Mobile;
          this.SuperUserId = data["message_data"][0].SuperUserId;
          this.returnGenderValue = data["message_data"][0].Gender;
         if (
            data["message_data"][0].DateOfBirth != undefined &&
            data["message_data"][0].DateOfBirth != null &&
            data["message_data"][0].DateOfBirth != ""
          ) {
            this.userDateOfBirth = new Date(
              data["message_data"][0].DateOfBirth
            );
          }
          if (
            data["message_data"][0].ProfileImageName != undefined &&
            data["message_data"][0].ProfileImageName != null &&
            data["message_data"][0].ProfileImageName != ""
          ) {
            this.CandidateProfileImageName =
              data["message_data"][0].ProfileImageName;
          } else {
            this.candidateProfile = this.mentorImgPath;
          }
        } else {
          this.candidateProfile = this.mentorImgPath;
        }
      }
    });
  }

 
  selectGender(event: MatSelectChange) {
    this.selectedGender = event.source.value;
  }
  changePasswordInfo() {
    var changePwd = this.changePassForm.value;
    if (this.changePassForm.invalid) {
    } else {
      // franchaise
      var param = {
        Email: this.changePassForm.value.email,
        Password: this.changePassForm.value.Password,
        newPassword: this.changePassForm.value.newPassword,
      };
      this.api.superUserUpdatePwd(param).subscribe(
        (data) => {
          if (data["message_code"] == 1000) {
            Swal.fire("Thank You!", `${data["message_text"]}`, "success").then(
              (okey) => {
                if (okey) {
                  window.location.reload();
                }
              }
            );
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
}
