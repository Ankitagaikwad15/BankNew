import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./../../shared/security/auth.service";
import { ApiService } from "src/app/shared/security/api.service";

import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
// import { MatMenuTrigger } from '@angular/material';
import Swal from "sweetalert2";
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  public theme: "light" | "dark" = "light";
  public size: "compact" | "normal" = "normal";
  public lang = "en";
  public type: "image" | "audio";
  submitted = false;
  returnUrl: string;
  error = "";
  hide = true;
  displayErrorMsg = "none";
  linkedInToken = "";
  userData: any;
  errorMsgObj: any;
  signindata: any;
  constructor(
    breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private api: ApiService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    private snackbar: MatSnackBar
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.pattern("^(?!.*xyz.co.in).*")]],
      mobile: ["", Validators.compose([Validators.pattern("[0-9]{10}")])],
      password: [null, [Validators.required]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  siteKey: string = "6LdlocghAAAAAAlwP6qd4WwBvgnk7DigfFlQJUKp";
  handleSuccess(data) {
    console.log(data);
  }
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((result) => {
        this.SetUserData(result.user);
        //  this.ngZone.run(() => {
        //   // this.router.navigate(['/dashboard2']);
        //   })
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    this.api.sociallogin(userData.uid, userData.email).subscribe(
      (data) => {
        console.log("Social Login API Response...", data);
        if (data["message_code"] == 1000) {
          this.ngZone.run(() => {
            localStorage.setItem("candID", data["uId"]);
            this.router.navigate(["/dashboard2"]);
          });
          // localStorage.setItem('UserName',data['message_text'][0]['user_name']);
          // localStorage.setItem('UserId',data['message_text'][0]['id']);
          //  this.router.navigate(['/dashboard2']);
        } else {
          this.snackbar.open(data["message_text"], "X", {
            duration: 3000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
            panelClass: "snackbar-danger",
          });
          this.error = data["message_text"];
        }
      },
      (error) => {
        this.error = error;
        this.submitted = false;
      }
    );
    return userRef.set(userData, {
      merge: true,
    });
  }

  FacebookAuth() {
    return this.AuthLogin1(new firebase.auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin1(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((result) => {
        this.SetUserData(result.user);
        // this.ngZone.run(() => {
        //   //this.router.navigate(['/dashboard2']);
        // })
      })
      .catch((error) => {});
  }

  onSubmit() {
    localStorage.clear();

    this.submitted = true;
    this.error = "";
    if (this.loginForm.invalid) {
      return;
    } else {
      
        this.signindata = {
          CandidateMobile: this.loginForm.value.mobile,
          CandidatePassword: this.loginForm.value.password,
        };
     
        this.api.login(this.signindata).subscribe(
          (data) => {
            if (data["message_code"] == 1000) {
              localStorage.setItem("normalUserLodging", JSON.stringify(200));
              localStorage.setItem("candID", data["message_data"].CandidateId);
         
              localStorage.setItem(
                "ProductIds",
                JSON.stringify(data["message_data"]["productsArr"])
              );
  
              this.router.navigate(["/franchise-bank"]);
           } else {
              this.snackbar.open(data["message_text"], "X", {
                duration: 3000,
                verticalPosition: "bottom",
                horizontalPosition: "center",
                panelClass: "snackbar-danger",
              });
            }
          },
          (error) => {
            if (error.error.message_code == "999") {
              Swal.fire({
                icon: "error",
                title: " Hello Dear.",
                text: `${error.error.message_text}`,
              });
            }
          }
        );
    }
  }

  msLoginUser() {
    window.open("http://52.74.110.248/nodejsApp/superUser/ms-signin", "_blank");
  }
}
