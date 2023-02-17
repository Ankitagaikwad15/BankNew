import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FranchiseBankComponent } from "./franchise-bank.component";

const routes: Routes = [{ path: "", component: FranchiseBankComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FranchiseBankRoutingModule {}
