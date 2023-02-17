import { DOCUMENT } from "@angular/common";
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  AfterViewInit,
} from "@angular/core";
import { RightSidebarService } from "../../shared/services/rightsidebar.service";
import { ConfigService } from "../../shared/services/config.service";
import { WINDOW } from "../../shared/services/window.service";
import { AuthService } from "src/app/shared/security/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/shared/security/api.service";
import { GlobalEventsManagerService } from "src/app/shared/security/globalEventsManager.service";
import { ConnectionService } from "ng-connection-service";
const document: any = window.document;
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  mentorImgPath = "https://www.dheya.net/PortalContents/Images/avatar-img.png";
  profileImg =
    "https://dheya-apps-data.s3.ap-southeast-1.amazonaws.com/user-profile-pics/";
  franchaiseprofileImg =
    "https://dheya-apps-data.s3.ap-southeast-1.amazonaws.com/mentor-profile-images/";
  c_name: any;
  franchaiselogo =
    "https://dheya-apps-data.s3-ap-southeast-1.amazonaws.com/mentor-logo/";
  public config: any = {};
  isNavbarCollapsed = true;
  isNavbarShow: boolean;
  CandidateId: any;
  DCLStudent: string;
  showDheyaLogo = false;
  offline = false;
  online = false;
  mentorportallogin = false;
  onlineEvent: any;
  candidateportal = false;
  offlineEvent: any;
  displayNewsheaderModal = false;
  displayCandidateNotificationheaderModal = false;
  superUserLodging: string;
  normalUserLodging: string;
  CandidateProfileImageName: any;
  candidateProfile: string;
  FranchiseId: string;
  AppLogoURL: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private renderer: Renderer2,
    private globalEventsManagerService: GlobalEventsManagerService,
    public elementRef: ElementRef,
    private ConnectionService: ConnectionService,
    private dataService: RightSidebarService,
    private dialog: MatDialog,
    private configService: ConfigService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}
  notifications: any[] = [
    {
      userImg: "https://www.dheya.net/PortalContents/Images/avatar-img.png",
      userName: "Announcement",
      time: "06/04/2021",
      message:
        "Dear Student, Your DCL dashboard is ready for the access now. Please login and enjoy the features.We are looking forward to get more features for you.",
    },
  ];

  newsnotifications: any[] = [
    {
      newsTitle: "Who is Maharastra CM",
      newsDescription:
        "The 29th Chief Minister of Maharashtra State, Shri Uddhav Thackeray is the current Chief of Shiv Sena.",
    },
  ];

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const offset =
      this.window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;
    if (offset > 50) {
      this.isNavbarShow = true;
    } else {
      this.isNavbarShow = false;
    }
  }
  ngOnInit() {
    this.config = this.configService.configData;
    this.superUserLodging = localStorage.getItem("superUserLodging");
  
    this.normalUserLodging = localStorage.getItem("normalUserLodging");
   
    if (localStorage.getItem("SuperUserId")) {
      this.CandidateId = localStorage.getItem("SuperUserId");
    } else {
      this.CandidateId = localStorage.getItem("candID");
    }
    if (this.superUserLodging == "100") {
      this.globalEventsManagerService.showNavBar.subscribe((mode) => {
        if (mode !== null) {
          this.getSuperUserDetailById();
        }
      });
      this.getSuperUserDetailById();
    } else if (this.normalUserLodging == "200") {
      this.globalEventsManagerService.showNavBar.subscribe((mode) => {
        if (mode !== null) {
          this.loadPersonalData();
        }
      });
      this.loadPersonalData();
    } else if (this.normalUserLodging == "300") {
      this.globalEventsManagerService.showNavBar.subscribe((mode) => {
        if (mode !== null) {
          this.loadPersonalData();
        }
      });
      this.loadPersonalData();
    }
    if (localStorage.getItem("candID")) {
      this.candidateportal = true;
    }
  }

  loadPersonalData() {
    this.api.getPersonalInfo(this.CandidateId).subscribe((data) => {
      if (data["message_data"].length !== 0) {
        this.c_name = data["message_data"].CandidateName;
        if (
          data["message_data"][0].CandidateProfileImageName != undefined &&
          data["message_data"][0].CandidateProfileImageName != null &&
          data["message_data"][0].CandidateProfileImageName != ""
        ) {
          this.CandidateProfileImageName =
            data["message_data"][0].CandidateProfileImageName;
        } else {
          this.candidateProfile = this.mentorImgPath;
        }
      } else {
        this.candidateProfile = this.mentorImgPath;
      }
    });
  }
  getSuperUserDetailById() {
    this.api.getSuperUserDetails().subscribe((data) => {
      if (data["message_code"] == 1000) {
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
      }
    });
  }
  showdirectory(id) {
  }
  ngAfterViewInit() {
    // set theme on startup
    if (localStorage.getItem("theme")) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(this.document.body, localStorage.getItem("theme"));
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }

    if (localStorage.getItem("menuOption")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("menuOption")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "menu_" + this.config.layout.sidebar.backgroundColor
      );
    }

    if (localStorage.getItem("choose_logoheader")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("choose_logoheader")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "logo-" + this.config.layout.logo_bg_color
      );
    }

    if (localStorage.getItem("sidebar_status")) {
      if (localStorage.getItem("sidebar_status") === "close") {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      } else {
        this.renderer.removeClass(this.document.body, "side-closed");
        this.renderer.removeClass(this.document.body, "submenu-closed");
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      }
    }
  }
  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
      this.showDheyaLogo = false;
    } else {
      this.renderer.addClass(this.document.body, className);
      this.showDheyaLogo = true;
    }
  }
 
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains("side-closed");
    if (hasClass) {
      this.renderer.removeClass(this.document.body, "side-closed");
      this.renderer.removeClass(this.document.body, "submenu-closed");
      this.showDheyaLogo = false;
    } else {
      this.renderer.addClass(this.document.body, "side-closed");
      this.renderer.addClass(this.document.body, "submenu-closed");
      this.showDheyaLogo = true;
    }
  }
  public toggleRightSidebar(): void {
    this.dataService.changeMsg(
      (this.dataService.currentStatus._isScalar =
        !this.dataService.currentStatus._isScalar)
    );
  }
  logout() {
    this.authService.logout().subscribe((res) => {
      if (!res.success) {
        localStorage.clear();
        this.router.navigate(["/authentication/signin"]);
      }
    });
  }

  superUserlogout() {
    this.authService.logout().subscribe((res) => {
      if (!res.success) {
        localStorage.clear();
        this.router.navigate(["/authentication/superlogin"]);
      }
    });
  }
  affiliatelogout() {
    if (localStorage.getItem("StageId") == "37") {
      // mentorlogout
      this.authService.logout().subscribe((res) => {
        if (!res.success) {
          localStorage.clear();
          this.router.navigate(["/authentication/mentorlogin"]);
        }
      });
    } else {
      this.authService.logout().subscribe((res) => {
        if (!res.success) {
          localStorage.clear();
          this.router.navigate(["/authentication/affilatelogin"]);
        }
      });
    }
  }
  goToNewsPage() {
    this.router.navigate(["/news"]);
    this.displayNewsheaderModal = false;
  }
  gotToProfilePage() {
    this.router.navigate(["/superprofile"]);
  }
  gotToaffilitaePage() {
    this.router.navigate(["/affilate-profile"]);
  }
  gotToCandidateProfilePage() {
    this.router.navigate(["/profile"]);
  }
  goToAllCandidateNotification() {
    this.router.navigate(["/candidate-notification"]);
    this.displayCandidateNotificationheaderModal = false;
  }

  openNewsModal() {
    this.displayNewsheaderModal = true;
  }

  openCandidateNotificationModal() {
    this.displayCandidateNotificationheaderModal = true;
  }
}
