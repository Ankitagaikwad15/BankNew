import { Router, NavigationEnd } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
} from "@angular/core";
import {
  NEWUSERROUTES,
  SUPPERUSERMENU,
} from "./sidebar-items";
import { ApiService } from "src/app/shared/security/api.service";
import { GlobalEventsManagerService } from "src/app/shared/security/globalEventsManager.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
   public sidebarItems: any[];

  showMenu = "dashboard";
  showSubMenu = "";
  showSubSubMenu = "";
  public innerHeight: any;
  showNavBar = true;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  headerHeight = 60;
  // UserName: any;
  CandidateProfileImageName: any;
  CandidateId: string;
  candidateProfile: string;
  superUserLodging: string;
  normalUserLodging: string;
  userName: any;
  StageId: string;
  applogo: any;
  AppLogoURL: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private api: ApiService,
    public elementRef: ElementRef,
    private globalEventsManagerService: GlobalEventsManagerService,
    private router: Router
  ) {
    // this.UserName = localStorage.getItem("UserName");

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.split("/")[1] === "multilevel") {
          this.showMenu = event.url.split("/")[1];
        } else {
          this.showMenu = event.url.split("/").slice(-2)[0];
        }
        this.showSubMenu = event.url.split("/").slice(-2)[0];
      }
    });
  }
  @HostListener("window:resize", ["$event"])

  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, "overlay-open");
    }
  }
  callMenuToggle(event: any, element: any) {
    if (element === this.showMenu) {
      this.showMenu = "0";
    } else {
      this.showMenu = element;
    }
    const hasClass = event.target.classList.contains("toggled");
    if (hasClass) {
      this.renderer.removeClass(event.target, "toggled");
    } else {
      this.renderer.addClass(event.target, "toggled");
    }
  }
  callSubMenuToggle(event: any, element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = "0";
    } else {
      this.showSubMenu = element;
    }
  }

  ngOnInit() {
    if (localStorage.getItem("SuperUserId")) {
      this.CandidateId = localStorage.getItem("SuperUserId");
    } else {
      this.CandidateId = localStorage.getItem("candID");
    }
    this.StageId = localStorage.getItem("StageId");
    this.superUserLodging = localStorage.getItem("superUserLodging");
    this.normalUserLodging = localStorage.getItem("normalUserLodging");
    if (this.StageId == "21" || this.StageId == "31") {
      this.sidebarItems = SUPPERUSERMENU.filter((obj) => obj);}
    
if (this.normalUserLodging == "200") {
      this.sidebarItems = NEWUSERROUTES.filter((sidebarItem) => sidebarItem);
    } 
}
}