import {
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
// import "rxjs/add/operator/map";
@Injectable({
  providedIn: "root",
})
export class ApiService {
  BASE_URL = "https://www.dheya.net/";
  // BASE_URL = "http://localhost:4200/";
  APPLICATION_API = "nodejsApp/";

  constructor(private http: HttpClient) {
    console.log("Api service provider from constructor.....");
  }
  //*****------------LOGIN API------------------******//
  login(data) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };

    return this.http.post(
      this.BASE_URL + this.APPLICATION_API + "candidates/logInwithmobile",
      data,
      options
    );

    //  http://13.229.22.131/jharkhand_tejaswini/apiv1/login POST user_mobile:9850180648 user_password:7055
  }
  superUserlogin(email, pwd) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
    let param = {
      Email: email,
      Password: pwd,
    };
    return this.http.post(
      // http://52.74.110.248/nodejsApp/superUser/login
      this.BASE_URL + this.APPLICATION_API + "superUser/login",
      param,
      options
    );
  }
  transactionhistory() {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
  
    return this.http.get(
      "https://mocki.io/v1/34d623a4-2a49-4c01-86fa-7627027d518a",
       options
    );
  }
  transferammount(data){
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
  
    return this.http.get(
      "https://mocki.io/v1/659c7459-e6bb-4f19-b40a-9c330c335480",
       options
    );
  }
  checkUserLoginOrNotLogin() {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
    // http://52.74.110.248/nodejsApp/auth/is-logged-in
    return this.http.get(
      this.BASE_URL + this.APPLICATION_API + "auth/is-logged-in",
      options
    );
  }
  sociallogin(id, email) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
    let param = {
      SocialId: id,
      CandidateEmail: email,
      Authtoken: null,
    };
    return this.http.post(
      this.BASE_URL + this.APPLICATION_API + "social",
      param,
      options
    );
  }
  verifyIFSC(data) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
    //http://52.74.110.248/nodejsApp/franchises/bankDetails/check_IFSC
    return this.http.post(
      this.BASE_URL +
        this.APPLICATION_API +
        "franchises/bankDetails/check_IFSC",
      data,
      options
    );
  }
  addbank(data) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
    http: return this.http.post(
      this.BASE_URL +
        this.APPLICATION_API +
        "franchises/bankDetails/add-BankDetails",
      data,
      options
    );
  }
  editbankdetails(data) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
    //http://52.74.110.248/nodejsApp/franchises/bankDetails/update-BankDetails
    http: return this.http.patch(
      this.BASE_URL +
        this.APPLICATION_API +
        "franchises/bankDetails/update-BankDetails",
      data,
      options
    );
  }
  bankbyfranchaiseId() {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
    http: return this.http.get(
        "https://mocki.io/v1/47f977ef-3cb8-4d43-94aa-7e8310948204",
  
      options
    );
  }
  getListForCodeType(data) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
    // http://52.74.110.248/nodejsApp/codeMaster/listForCodeType
    return this.http.post(
      this.BASE_URL + this.APPLICATION_API + "codeMaster/listForCodeType",
      data,
      options
    );
  } 
  getSuperUserDetails() {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
    //http://52.74.110.248/nodejsApp/superUser/details
    return this.http.get(
      this.BASE_URL + this.APPLICATION_API + "superUser/details",
      options
    );
  }
  getPersonalInfo(candID) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
    // let candID = localStorage.getItem("candID");

    return this.http.get(
      this.BASE_URL +
        this.APPLICATION_API +
        "candidates/get-personal-details/" +
        candID,
      options
    );
  }
  candidateUpdatePwd(data) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
    // http://52.74.110.248/nodejsApp/candidates/update-pwd
    return this.http.patch(
      this.BASE_URL + this.APPLICATION_API + "candidates/update-pwd",
      data,
      options
    );
  }
  superUserUpdatePwd(data) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
    //http://52.74.110.248/nodejsApp/superUser/update-pwd
    return this.http.patch(
      this.BASE_URL + this.APPLICATION_API + "superUser/update-pwd",
      data,
      options
    );
  }
  updateSuperUser(param) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
    //http://52.74.110.248/nodejsApp/superUser/updateDetails
    return this.http.patch(
      this.BASE_URL + this.APPLICATION_API + "superUser/updateDetails",
      param,
      options
    );
  }
  
  getCandidate(param) {
    // const loginToken = localStorage.getItem("loginToken");
    const httpHeaders = new HttpHeaders({
      // Authorization: "Bearer " + loginToken,
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    const options = {
      headers: httpHeaders,
    };
    return this.http.post(
      // http://52.74.110.248/nodejsApp/candidates/getCandidates
      this.BASE_URL + this.APPLICATION_API + "candidates/getCandidates",
      param,
      options
    );
  }
  updatePersonalInfo(CandidateId, param) {
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, no-cache",
    });
    // http://52.74.110.248/nodejsApp/candidates/update-personal-details
    const options = {
      headers: httpHeaders,
    };
    return this.http.put(
      this.BASE_URL +
        this.APPLICATION_API +
        "candidates/update-personal-details/" +
        CandidateId,
      param,
      options
    );
  }

 
}
