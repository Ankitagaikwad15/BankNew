import { Component } from "@angular/core";
import { Event, Router, NavigationStart, NavigationEnd } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { PlatformLocation } from "@angular/common";
import { ApiService } from "./shared/security/api.service";
import { fromEvent, Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConnectionService } from "ng-connection-service";
import { GlobalEventsManagerService } from "./shared/security/globalEventsManager.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  onlineEvent: any;
  offlineEvent: any;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  noInternetConnection: boolean;
  title = "internet-connection-check";
  status = "ONLINE"; //initializing as online by default
  isConnected = true;
  currentUrl: string;

  constructor(
    private ConnectionService: ConnectionService,
    public _router: Router,

    location: PlatformLocation,
    private globalEventsManagerService: GlobalEventsManagerService,
    private spinner: NgxSpinnerService,
    private api: ApiService,
    public snackBar: MatSnackBar
  ) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.spinner.show();
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf("/") + 1
        );
      }
      if (routerEvent instanceof NavigationEnd) {
        this.spinner.hide();
      }
      window.scrollTo(0, 0);
    });
    this.api.checkUserLoginOrNotLogin().subscribe((data) => {
      if (data["message_code"] == 999) {
        this._router.navigate(["/authentication/signin"]);
      }
    });
  }

  //Check Internet ON/OFF//
  ngOnInit(): void {
    /**
     * Get the online/offline status from browser window
     */
  }
}
