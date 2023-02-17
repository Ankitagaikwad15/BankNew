import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
    console.log("Auth Guard Service get called...");
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url: string = state.url;
    return this.checkUserLogin(route, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    var superUserLodging = localStorage.getItem("superUserLodging");
    var normalUserLodging = localStorage.getItem("normalUserLodging");
    if (superUserLodging == "100") {
      this.router.navigate(["/authentication/superlogin"]);
      return false;
    } else if (normalUserLodging == "200") {
      this.router.navigate(["/authentication/signin"]);
      return false;
    }
  }
}
