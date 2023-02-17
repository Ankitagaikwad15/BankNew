import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = false;
 

  constructor(private router:Router) {
    console.log("Auth Service get called...")

  }

  // login(username: string, password: string) {
  //   const user = this.users.find(
  //     (x) => x.username === username && x.password === password
  //   );

  //   if (user) {
  //     localStorage.setItem('STATE', 'true');
  //     this.isLogin = true;
  //   } else {
  //     localStorage.setItem('STATE', 'false');
  //     this.isLogin = false;
  //   }
  //   return of({ success: this.isLogin });
  // }

  logout() {
    this.isLogin = false;
    localStorage.setItem('STATE', 'false');
    return of({ success: this.isLogin });
  }

  isLoggedIn(): boolean {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn === 'true') {
      this.router.navigate(['/dashboard2']);
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }
}
