import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../shared/security/auth.service";
import { ApiService } from "src/app/shared/security/api.service";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from "sweetalert2";
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
@Component({
  selector: "app-superlogin",
  templateUrl: "./superlogin.component.html",
  styleUrls: ["./superlogin.component.scss"],
})
export class SuperloginComponent implements OnInit {
  loginForm: FormGroup;
  public theme: "light" | "dark" = "light";
  public size: "compact" | "normal" = "normal";
  public lang = "en";
  public type: "image" | "audio";
  submitted = false;
  returnUrl: string;
  error = "";
  captchaSucess = false;
  hide = true;
  linkedInToken = "";
  userData: any;
  constructor(
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
    this.linkedInToken = this.route.snapshot.queryParams["code"];

    this.loginForm = this.formBuilder.group({
      username: [
      
        null,
        [Validators.required, , Validators.pattern("^(?!.*xyz.co.in).*")],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}$"
          ),
        ],
      ],
    });
    }
  get f() {
    return this.loginForm.controls;
  }
  siteKey: string = "6LdlocghAAAAAAlwP6qd4WwBvgnk7DigfFlQJUKp";
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }
  AuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then((result) => {
        this.SetUserData(result.user);
      
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
            this.router.navigate(["/dashboard"]);
          });
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
      let param = {
        Email: this.loginForm.value.username.trim(),
        Password: this.loginForm.value.password,
      };
      this.api
        .superUserlogin(
          this.loginForm.value.username.trim(),
          this.loginForm.value.password
        )
        .subscribe(
          (data) => {
            if (data["message_code"] == 1000) {
              localStorage.setItem("superUserLodging", JSON.stringify(100));
              localStorage.setItem("StageId", data["message_data"].StageId);
              localStorage.setItem(
                "SuperUserId",
                data["message_data"].SuperUserId
              );
              // product Id
              localStorage.setItem(
                "ProductIds",
                JSON.stringify(data["message_data"]["productsArr"])
              );
             
              if (data["message_data"].StageId < 39) {
                this.router.navigate(["/userclient"]);
              }
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
}
