import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Page404Component } from "./authentication/page404/page404.component";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
import { AuthGuard } from "./shared/security/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      { path: "", redirectTo: "/authentication/signin", pathMatch: "full" },

     
    
      {
        path: "icons",
        loadChildren: () =>
          import("./icons/icons.module").then((m) => m.IconsModule),
      },

     
      {
        path: "profile",
        loadChildren: () =>
          import("./profile/profile.module").then((m) => m.ProfileModule),
      },
      {
        path: "superprofile",
        loadChildren: () =>
          import("./super-profile/super-profile.module").then(
            (m) => m.SuperProfileModule
          ),
      },
     
      {
        path: "franchise-bank",
        loadChildren: () =>
          import("./franchise-bank/franchise-bank.module").then(
            (m) => m.FranchiseBankModule
          ),
      },
     
    
      {
        path: "userclient",
        loadChildren: () =>
          import("./userclient/userclient.module").then((m) => m.UserClientModule),
      },
      
   
      {
        path: "transaction-money",
        loadChildren: () =>
          import("./transaction-money/transaction-money.module").then((m) => m.TransactionMoneyModule),
      },
     {
        path: "transaction-history",
        loadChildren: () =>
          import("./transaction-history/transaction-history.module").then(
            (m) => m.TransactionHistoryModule
          ),
      },

     
    
     
    ],
  },
  {
    path: "authentication",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },


  { path: "**", component: Page404Component },
];

export const routing = RouterModule.forRoot(routes);
