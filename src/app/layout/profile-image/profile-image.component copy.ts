import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "src/app/shared/security/api.service";
@Component({
  selector: "app-profile-image",
  templateUrl: "./profile-image.component.html",
  styleUrls: ["./profile-image.component.sass"],
})
export class ProfileImageComponent implements OnInit {
  @Input() ProfileImageName: any = {};
  imageName: any;
  CandidateId: string;
  candId: any;
  CandidateProfileImageName: any;
  candidateProfile: any;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.CandidateId = localStorage.getItem("candID");
    this.loadPersonalData();
  }
  loadPersonalData() {
    this.api.getPersonalInfo(this.CandidateId).subscribe((data) => {
      if (data["message_code"] == 1000) {
        this.candId = data["message_data"][0].CandidateId;
        if (
          data["message_data"][0].CandidateProfileImageName != undefined &&
          data["message_data"][0].CandidateProfileImageName != null &&
          data["message_data"][0].CandidateProfileImageName != ""
        ) {
          this.CandidateProfileImageName =
            data["message_data"][0].CandidateProfileImageName;
        } else {
         }
      }
    });
  }
}
